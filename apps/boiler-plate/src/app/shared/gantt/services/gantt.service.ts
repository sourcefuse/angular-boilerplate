import {
  Overlay,
  OverlayConfig,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import {ComponentPortal, TemplatePortal} from '@angular/cdk/portal';
import {
  ComponentFactoryResolver,
  ElementRef,
  Inject,
  Injectable,
  Injector,
  Type,
} from '@angular/core';
import {AnyObject} from '@boiler/core/api/backend-filter';
import {GanttEventName} from 'dhtmlx-gantt/codebase/dhtmlxgantt';
import {debounceTime, fromEventPattern, Subject} from 'rxjs';
import {GanttHeaderComponent} from '../components/gantt-header/gantt-header.component';
import {GanttTooltipComponent} from '../components/gantt-tooltip/gantt-tooltip.component';
import {
  BUFFER_FOR_TODAY,
  GANTT,
  GANTT_BAR_HEIGHT,
  GANTT_ROW_HEIGHT,
  GANTT_SCALES,
  GANTT_SCALE_HEIGHT,
  GANTT_SCROLL_BAR_HEIGHT,
  GANTT_TIMELINE_MIN_WIDTH,
  isHTMLELement,
  RESIZER_WIDTH,
} from '../const';
import {GanttEventTypes} from '../enum';
import {
  GanttAdapter,
  GanttEvent,
  GanttLib,
  GanttRenderOptions,
  GanttScaleOptions,
  GanttScaleService,
  GanttTaskValue,
  Timelines,
} from '../types';

@Injectable()
export class GanttService<T extends AnyObject, S extends AnyObject> {
  private _data!: GanttTaskValue<T>[];
  private _overlays: OverlayRef[] = [];
  private _tooltipOverlay!: OverlayRef;
  private _eventHandlers: string[] = [];
  private _descSort!: boolean;
  private _events = new Subject<GanttEvent<T>>();
  private _moveToToday = true;
  private _markToday = true;
  private _highlightRange?: [Date, Date];
  get events() {
    return this._events.asObservable();
  }
  constructor(
    private adapter: GanttAdapter<T>,
    @Inject(GANTT)
    private readonly gantt: GanttLib,
    @Inject(GANTT_SCALES)
    private readonly scales: GanttScaleService[],
    // will have to use this for now
    // refer https://github.com/angular/angular/issues/45263#issuecomment-1082530357
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder,
  ) {}

  /**
   * It renders the gantt chart in the container element.
   * It also sets the columns, templates, and other configurations.
   * @param {ElementRef} container - ElementRef - The container element where the gantt chart will be
   * rendered.
   * @param {GanttRenderOptions} options - GanttRenderOptions
   */
  render(container: ElementRef, options: GanttRenderOptions<T>) {
    this._setColumnHeaders(options);
    this.gantt.templates.task_text = (start, end, task) =>
      this._renderComponent(options.barComponent, {item: task});
    this.gantt.templates.grid_open = task => '';
    this.gantt.templates.grid_folder = task => '';

    this._moveToToday = options.moveToToday;
    this._highlightRange = options.highlightRange;
    this._markToday = options.markToday;

    this.gantt.config.row_height = GANTT_ROW_HEIGHT;
    this.gantt.config.bar_height = GANTT_BAR_HEIGHT;
    this.gantt.config.scale_height = GANTT_SCALE_HEIGHT;
    this.gantt.config.readonly = true;
    this.gantt.config.keyboard_navigation_cells = true;
    this.gantt.config.layout = {
      css: 'gantt_container',
      rows: [
        {
          cols: [
            {
              view: 'grid',
              id: 'grid',
              scrollX: 'scrollHor',
              scrollY: 'scrollVer',
              width: options.columnWidth,
            },
            {
              view: 'timeline',
              id: 'timeline',
              scrollX: 'scrollHor',
              scrollY: 'scrollVer',
              minWidth: GANTT_TIMELINE_MIN_WIDTH,
            },
            {view: 'scrollbar', scroll: 'y', id: 'scrollVer'},
          ],
        },
        {
          view: 'scrollbar',
          scroll: 'x',
          id: 'scrollHor',
          height: GANTT_SCROLL_BAR_HEIGHT,
        },
      ],
    };

    if (options.resizer) {
      this.gantt.config.layout.rows[0].cols.splice(1, 0, {
        resizer: true,
        width: RESIZER_WIDTH,
      });
    }

    this.gantt.plugins({
      keyboard_navigation: true,
      marker: true,
    });

    // refer - https://forum.dhtmlx.com/t/custom-button-in-grid/34516
    this._eventHandlers.push(
      this.gantt.attachEvent(
        'onTaskClick',
        (id, e) => {
          this._eventHandler(id, e, options);
        },
        {},
      ),
    );
    this._eventHandlers.push(
      this.gantt.attachEvent(
        'onGridHeaderClick',
        (id, e) => {
          this._eventHandler(id, e, options);
        },
        {},
      ),
    );

    const hoverObservable =
      this.convertToObservable<[string, MouseEvent]>('onMouseMove');
    const debounceTimeinMS = 100;
    hoverObservable
      .pipe(debounceTime(debounceTimeinMS))
      .subscribe(([id, event]) => {
        this._hoverEventHandler(event, options);
      });

    this._eventHandlers.push(
      this.gantt.attachEvent(
        'onBeforeGanttRender',
        () => {
          let range = this.gantt.getSubtaskDates();
          if (range.start_date && range.end_date) {
            const today = new Date();
            today.setDate(today.getDate() + BUFFER_FOR_TODAY);
            // as per requirement, need to always show current date in gantt
            this.gantt.config.start_date = new Date(
              Math.min(range.start_date.getTime(), today.getTime()),
            );
            this.gantt.config.end_date = new Date(
              Math.max(range.end_date.getTime(), today.getTime()),
            );
          }
        },
        {},
      ),
    );
    this.gantt.init(container.nativeElement);

    this._renderTodayMarker();
    this.setScale(options.defaultScale, false);
  }

  /**
   * It takes in an array of data, and feeds it to the Gantt chart.
   * It also calls the adapter to convert the data to the format that the Gantt chart expects.
   * @param {T[]} data - The data that you want to feed to the Gantt chart.
   */
  feed(data: T[]) {
    this._data = this.adapter.adaptFrom(data);
    this._refresh();
  }

  /**
   * It sets the scale of the Gantt chart based on the type of timeline selected
   * @param {Timelines} type - Timelines - This is the enum that we created earlier.
   * @param [render=true] - boolean - whether to render the gantt chart after the scale is set.
   */
  setScale(type: Timelines, options?: GanttScaleOptions, render = true) {
    const scale = this.scales.find(s => s.scale === type);
    if (scale) {
      this.gantt.config.scales = scale.config(options);
    }
    if (scale && render) {
      this._rerender();
    }
  }

  highlightRange(range: [Date, Date]) {
    this._highlightRange = range;
    this._refresh();
  }

  /**
   * It destroys the Gantt chart
   */
  destroy() {
    this.gantt.destructor();
  }

  /**
   * It clears all the tasks and links from the Gantt chart
   */
  clear() {
    this.gantt.clearAll();
    for (let handlers of this._eventHandlers) {
      this.gantt.detachEvent(handlers);
    }
  }

  /**
   * It closes the current overlay
   */
  closeContextMenu() {
    for (let overlay of this._overlays) {
      overlay.dispose();
    }
  }

  private _refresh() {
    this.gantt.clearAll();
    this.gantt.parse({
      tasks: this._data ?? [],
    });
    if (this._descSort !== undefined) {
      this.gantt.sort('name', this._descSort, undefined, true);
    }
    this._rerender();
  }

  private _renderHighlighMarker() {
    if (this._highlightRange) {
      this.gantt.addMarker?.({
        start_date: this._highlightRange[0],
        end_date: this._highlightRange[1],
        css: 'highlight',
      });
    }
  }

  private _rerender() {
    this.gantt.render();
    this._renderTodayMarker();
    this._renderHighlighMarker();
    if (this._moveToToday) {
      this.gantt.showDate(new Date());
    }
  }

  private _renderTodayMarker() {
    if (this._markToday) {
      this.gantt.addMarker?.({
        start_date: new Date(),
        css: 'today',
      });
    }
  }

  private _setColumnHeaders(options: GanttRenderOptions<T>) {
    this.gantt.config.columns = [
      {
        name: 'name',
        label: this._renderComponent(GanttHeaderComponent, {
          desc: this._descSort,
          name: options.columnName,
          searchPlaceholder: options.searchPlaceholder,
          showSearch: options.showSearch,
        }),
        width: options.columnWidth,
        tree: true,
        template: (item: GanttTaskValue<T>) =>
          this._renderComponent(options.columnComponent, {
            item,
            contextItems: options.contextItems,
            showKebab: options.showKebab,
            showParentInitials: options.showParentInitials,
            showChildInitials: options.showChildInitials,
            showOverallocatedIcon: options.showOverallocatedIcon,
            contextItemFilter: options.contextItemFilter,
          }),
      },
    ];
  }

  private _eventHandler(
    id: number,
    event: MouseEvent,
    options: GanttRenderOptions<T>,
  ) {
    if (event.target && isHTMLELement(event.target)) {
      const target = event.target.closest('[data-gantt-click]');
      if (!target) {
        return;
      }
      const attribute = target.getAttribute('data-gantt-click');
      switch (attribute) {
        case GanttEventTypes.Kebab:
          this._handleKebabClick(id, event, options);
          break;
        case GanttEventTypes.Expand:
          const task = this.gantt.getTask(id);
          if (!task.$open) {
            this.gantt.open(id);
          } else {
            this.gantt.close(id);
          }
          break;
        case GanttEventTypes.Sort:
          this._descSort = !this._descSort;
          this._setColumnHeaders(options);
          this.gantt.sort('name', this._descSort);
          break;
        default:
          this._events.next({
            task: this.gantt.getTask(id),
            event: attribute ?? GanttEventTypes.Unknown,
          });
      }
    }
  }

  private _renderComponent<T extends AnyObject>(
    c: Type<T>,
    inputs: Partial<{[key in keyof T]: T[keyof T]}>,
  ) {
    const factory = this.resolver.resolveComponentFactory(c);
    const component = factory.create(this.injector);
    Object.keys(inputs).forEach(key => {
      const value = inputs[key];
      if (value !== undefined) {
        component.instance[key as keyof T] = value;
      }
    });
    component.changeDetectorRef.detectChanges();
    return component.location.nativeElement.innerHTML;
  }

  private _handleKebabClick(
    id: number,
    e: MouseEvent,
    options: GanttRenderOptions<T>,
  ) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .left(e.clientX + 'px')
      .top(e.clientY + 'px');
    const configs = new OverlayConfig({
      hasBackdrop: true,
      panelClass: ['gantt-menu-overlay'],
      backdropClass: 'modal-background',
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
    const overlay = this.overlay.create(configs);

    if (options.contextTemplate && options.viewContainerRef) {
      const item = this._data.find(d => d.id === id);
      overlay.attach(
        new TemplatePortal(options.contextTemplate, options.viewContainerRef, {
          item,
          contextItems:
            (item && options.contextItemFilter?.(item)) ?? options.contextItems,
        }),
      );
    }
    overlay.backdropClick().subscribe(() => {
      overlay.dispose();
    });
    this._overlays.push(overlay);
  }

  private _hoverEventHandler(
    event: MouseEvent,
    options: GanttRenderOptions<T>,
  ) {
    if (event.target && isHTMLELement(event.target) && options.showTooltip) {
      const target = event.target.closest('[gantt-hover]');
      const attribute = target?.getAttribute('gantt-hover')!;
      if (target) {
        switch (attribute) {
          case GanttEventTypes.Bar:
            this._handleHoverOnBar(target, 'gantt-bar-data');
            return;
          case GanttEventTypes.Tooltip:
            return;
        }
      }
    }
    if (this._tooltipOverlay) {
      this._tooltipOverlay.dispose();
    }
  }

  private _handleHoverOnBar(target: Element, tag: string) {
    if (this._tooltipOverlay) {
      this._tooltipOverlay.dispose();
    }

    const offset = 35;
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(target)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'top',
          offsetY: offset,
        },
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -5,
        },
      ]);
    const configs = new OverlayConfig({
      panelClass: ['gantt-tooltip-overlay'],
      positionStrategy,
    });

    this._tooltipOverlay = this.overlay.create(configs);

    const attributeHover = target.getAttribute(tag);
    if (attributeHover && tag === 'gantt-bar-data') {
      const tooltipRef = this._tooltipOverlay.attach(
        new ComponentPortal(GanttTooltipComponent),
      );
      tooltipRef.instance.item = JSON.parse(attributeHover);
      this._overlays.push(this._tooltipOverlay);
    }
  }

  convertToObservable<T>(eventName: GanttEventName) {
    return fromEventPattern<T>(handler => {
      this._eventHandlers.push(
        this.gantt.attachEvent(
          eventName,
          (id, e) => {
            handler(id, e);
          },
          {},
        ),
      );
    });
  }
}
