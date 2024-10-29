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

import {GanttEventName} from 'dhtmlx-gantt/codebase/dhtmlxgantt';
import {intersection} from 'lodash';

import {NgxPermissionsService} from 'ngx-permissions';
import {
  BehaviorSubject,
  Subject,
  Subscription,
  distinct,
  fromEventPattern,
  map,
  switchMap,
  tap,
} from 'rxjs';
import {GanttHeaderComponent} from '../components/gantt-header/gantt-header.component';
import {GanttTooltipComponent} from '../components/gantt-tooltip/gantt-tooltip.component';
import {
  BUFFER_FOR_TODAY,
  COLUMN_WIDTH,
  GANTT,
  GANTT_BAR_HEIGHT,
  GANTT_ROW_HEIGHT,
  GANTT_SCALES,
  GANTT_SCALE_HEIGHT,
  GANTT_SCROLL_BAR_HEIGHT,
  GANTT_TIMELINE_MIN_WIDTH,
  PARENT_ROW_HEIGHT_HEADINGS,
  RESIZER_WIDTH,
  isHTMLELement,
} from '../const';
import {GanttEventTypes, GanttEventValues} from '../enum';
import {
  GanttAdapter,
  GanttEvent,
  GanttLib,
  GanttRenderOptions,
  GanttScaleOptions,
  GanttScaleService,
  GanttTaskValue,
  KebabListItem,
  TimelineArray,
  Timelines,
} from '../types';
import {AnyObject} from '@project-lib/core/api';
import {DIGITS} from '@project-lib/core/constants';
import {DateOperationService} from './date-operation.service';
import * as moment from 'moment';

const DEFAULT_TOP_OFFSET = 35;
const DEFAULT_BOTTOM_OFFSET = 5;
@Injectable()
export class GanttService<T extends AnyObject> {
  private _data: GanttTaskValue<T>[];
  private _overlays: OverlayRef[] = [];
  private _tooltipOverlay?: OverlayRef;
  private _tooltipOpenEvent?: GanttEventTypes;
  private _hoverSubcription?: Subscription;
  private _descSort = false;
  private _highlightRange: [Date, Date];
  private _options?: GanttRenderOptions<T>;
  private _events$ = new Subject<GanttEvent<T>>();
  private _offset$: BehaviorSubject<number> = new BehaviorSubject(0);
  private _reset$: Subject<number> = new Subject<number>();
  private _rendered = false;
  private _userPermissions: string[] = [];
  private _loadedPage = 0;
  private _selectedScale: Timelines = 0;
  on;
  get offset() {
    return this._offset$.asObservable();
  }
  get events() {
    return this._events$.asObservable();
  }

  set options(options: GanttRenderOptions<T>) {
    this._options = options;
  }

  constructor(
    private adapter: GanttAdapter<T>,
    @Inject(GANTT)
    public readonly gantt: GanttLib,
    @Inject(GANTT_SCALES)
    private readonly scales: GanttScaleService[],
    // will have to use this for now
    // refer https://github.com/angular/angular/issues/45263#issuecomment-1082530357
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private overlay: Overlay,
    private dateOperationService: DateOperationService,
    private overlayPositionBuilder: OverlayPositionBuilder,
    private ngxPermissionService: NgxPermissionsService,
  ) {
    const permissionsObject = this.ngxPermissionService.getPermissions();
    this._userPermissions = Object.keys(permissionsObject);
  }
  /**
   * It renders the gantt chart in the container element.
   * It also sets the columns, templates, and other configurations.
   * @param {ElementRef} container - ElementRef - The container element where the gantt chart will be
   * rendered.
   * @param {GanttRenderOptions} options - GanttRenderOptions
   */
  render(container: ElementRef, options: GanttRenderOptions<T>) {
    // this._setColumnHeaders(options);
    this.gantt.templates.grid_row_class = (start, end, task) =>
      task.rowClasses?.join(' ');
    this.gantt.templates.task_row_class = (start, end, task) =>
      task.rowClasses?.join(' ').concat(task.columnClasses);
    // this.gantt.templates.task_text = (start, end, task) =>
    //   this._renderComponent(options.barComponent, {
    //     item: task,
    //   });
    this.gantt.templates.grid_open = task => '';
    this.gantt.templates.grid_folder = task => '';
    this._options = options;

    this.gantt.config.row_height = GANTT_ROW_HEIGHT;
    this.gantt.config.bar_height = GANTT_BAR_HEIGHT;
    this.gantt.config.scale_height = GANTT_SCALE_HEIGHT;
    this.gantt.config.readonly = true;
    this.gantt.config.keyboard_navigation_cells = true;
    this.gantt.config.scroll_size = 20;
    this.gantt.config.min_column_width = 48;
    this.gantt.config.layout = {
      css: 'gantt_container',
      rows: [
        {
          cols: [
            {
              group: 'left',
              rows: [
                {
                  view: 'grid',
                  id: 'grid',
                  scrollY: 'scrollVer',
                  width: options.columnWidth,
                },
              ],
              width: options.columnWidth,
            },
            {
              group: 'right',
              rows: [
                {
                  cols: [
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
              ],
              minWidth: GANTT_TIMELINE_MIN_WIDTH,
            },
          ],
        },
        {
          height: GANTT_SCROLL_BAR_HEIGHT,
          cols: [
            {
              group: 'left',
              height: 0,
              width: options.columnWidth,
              css: 'gantt_horizontal_scroll',
            },
            {
              group: 'right',
              view: 'scrollbar',
              scroll: 'x',
              id: 'scrollHor',
              height: GANTT_SCROLL_BAR_HEIGHT,
              minWidth: GANTT_TIMELINE_MIN_WIDTH,
            },
          ],
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
    this.gantt.attachEvent(
      'onTaskClick',
      (id, e) => {
        this._eventHandler(id, e, options);
      },
      {},
    );
    this.gantt.attachEvent(
      'onEmptyClick',
      (id, e) => {
        this._eventHandler(id, e, options);
      },
      {},
    );
    this.gantt.attachEvent(
      'onGridHeaderClick',
      (id, e) => {
        this._eventHandler(id, e, options);
      },
      {},
    );

    const hoverObservable =
      this.convertToObservable<[string, MouseEvent]>('onMouseMove');
    this._hoverSubcription = hoverObservable.subscribe(([id, event]) => {
      this._hoverEventHandler(event, options);
    });

    this.gantt.attachEvent(
      'onBeforeGanttRender',
      () => {
        this._tooltipOverlay?.dispose();
        this._setGanttStartAndEndDates(options);
      },
      {},
    );
    this.gantt.attachEvent(
      'onBeforeTaskDisplay',
      (id, task) => {
        if (
          this._options?.ganttStartDate &&
          moment(task.start_date).isSame(moment(task.end_date))
        ) {
          task.start_date = this._options.ganttStartDate;
          task.end_date = this._options.ganttStartDate;
        }
        if (task.isLabel) {
          return !!this.gantt.hasChild(task.id);
        }
        return true;
      },
      {},
    );
    this.gantt.init(container.nativeElement);
    this._rendered = true;
    console.log(this.gantt);

    // if (options.infiniteScroll) {
    //   this._setupPagination();
    //   this._reset$.next(0);
    // }
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
    this.refresh();
  }
  /**
   * It adds new data to the Gantt chart, required when the gantt is in infinite scroll mode.
   * @param {T[]} data - T[] - the data to add to the gantt chart
   */
  add(data: T[]) {
    if (this._rendered) {
      // add groupings as they can not be added through adapter in infinite scroll mode
      this._buildGroupings();
      const scrollState = this.gantt.getScrollState();
      let newData = this.adapter.adaptFrom(data);
      newData = newData.filter(r => !this.gantt.isTaskExists(r.id));
      this._data = [...(this._data ?? []), ...newData];
      this.gantt.parse({
        tasks: newData,
      });
      // to restore scroll state after new data is added
      this.gantt.scrollTo(scrollState.x, scrollState.y);
    }
  }

  /**
   * It sets the scale of the Gantt chart based on the type of timeline selected
   * @param {Timelines} type - Timelines - This is the enum that we created earlier.
   * @param [render=true] - boolean - whether to render the gantt chart after the scale is set.
   */
  setScale(type: Timelines, options?: GanttScaleOptions, render = true) {
    const scale = this.scales.find(s => s.scale === type);
    this._selectedScale = type;
    if (scale) {
      this.gantt.config.scales = scale.config(options);
    }
    if (scale && render) {
      this.rerender();
    }
  }
  public get selectedScale() {
    return this._selectedScale;
  }

  highlightRange(range: [Date, Date]) {
    this._highlightRange = range;
    this.refresh();
  }

  /**
   * The function clears the data array, clears the gantt chart, and then emits a value to the reset
   * observable for scroll offset
   */
  refreshInfiniteScroll() {
    this.clear();
    this._reset$.next(0);
  }

  /**
   * It destroys the Gantt chart
   */
  destroy() {
    this.gantt.destructor();
    this._closeOverlays();
    this._hoverSubcription?.unsubscribe();
  }

  /**
   * It clears all the tasks and links from the Gantt chart
   */
  clear() {
    this._data = [];
    this.gantt.clearAll();
  }

  /**
   * It closes the current overlay
   */
  closeContextMenu() {
    for (const overlay of this._overlays) {
      overlay.dispose();
    }
  }

  refresh() {
    this.gantt.clearAll();
    this.gantt.parse({
      tasks: this._data ?? [],
    });
    if (this._descSort !== undefined) {
      this.gantt.sort('name', this._descSort, undefined, true);
    }
    this.rerender();
  }

  rerender(moveToSpecificDate = true) {
    this.gantt.render();
    this._closeOverlays();
    this._renderTodayMarker();
    this._renderHighlighMarker();
    if (moveToSpecificDate) {
      if (this._options?.moveToToday) {
        this.gantt.showDate(new Date());
      } else {
        this.gantt.showDate(this.gantt.config.start_date);
      }
    }
  }

  private _buildGroupings() {}

  private _renderHighlighMarker() {
    if (this._highlightRange) {
      this.gantt.addMarker?.({
        start_date: this._highlightRange[0],
        end_date: this._highlightRange[1],
        css: 'highlight',
      });
    }
  }

  private _renderTodayMarker() {
    console.log(this._options);
    if (this._options?.markToday) {
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
        }),
        width: options.columnWidth,
        tree: true,
        template: (item: GanttTaskValue<T>) => {
          let filteredItems =
            (item && options.contextItemFilter?.(item)) ?? options.contextItems;
          if (options.kebabOption && !filteredItems.length) {
            filteredItems = options.kebabOption(this.gantt.getTask(item.id));
          }
          filteredItems = filteredItems.filter(item => console.log(item));
          return this._renderComponent(options.columnComponent, {
            item,
            contextItems: filteredItems,
            showKebab: options.showKebab,
            showParentInitials: options.showParentInitials,
            showChildInitials: options.showChildInitials,
            showOverallocatedIcon: options.showOverallocatedIcon,
          });
        },
      },
    ];
  }

  private _setupPagination() {
    const scroll$ = this.convertToObservable<[number, number]>('onGanttScroll');
    this._reset$
      .pipe(
        tap(_ => {
          this._loadedPage = 0;
          this.gantt.scrollTo(0, 0);
          this._offset$.next(0);
        }),
        switchMap(() =>
          scroll$.pipe(
            map(() => {
              const visibleTasks = this.gantt.getVisibleTaskCount();
              const lastVisibleTask = this.gantt.getTaskByIndex(
                visibleTasks - 1,
              );
              if (this.gantt.getTaskRowNode(lastVisibleTask?.id)) {
                return lastVisibleTask?.id;
              }
              return 0;
            }),
            distinct(),
          ),
        ),
      )
      .subscribe(_ => {
        this._offset$.next(this._loadedPage++);
      });
  }

  private _eventHandler(
    id: number,
    event: MouseEvent,
    options?: GanttRenderOptions<T>,
  ) {
    this._tooltipClose(event?.target, GanttEventTypes.Hover);
    if (event?.target && isHTMLELement(event.target)) {
      const target = event.target.closest('[gantt-click]');
      if (!target) {
        return;
      }
      const attribute = target.getAttribute('gantt-click');
      switch (attribute) {
        case GanttEventValues.Kebab:
          if (options.kebabOption) {
            const list = options.kebabOption(this.gantt.getTask(id));
            this._handleKebabClick(id, event, options, target, list);
          } else {
            this._handleKebabClick(id, event, options, target);
          }
          break;
        case GanttEventValues.Expand: {
          const task = this.gantt.getTask(id);
          if (!task.$open) {
            this.gantt.open(id);
          } else {
            this.gantt.close(id);
          }
          break;
        }
        case GanttEventValues.Sort:
          this._descSort = !this._descSort;
          this._setColumnHeaders(options);
          this.gantt.sort('name', this._descSort);
          break;
        case GanttEventValues.Tooltip:
          this._openTooltip(target, GanttEventTypes.Click, options, event);
          break;
        case GanttEventValues.ExpandBar:
          this._expandGanttBar(target, options);
          break;
        default:
          this._events$.next({
            task: this.gantt.getTask(id),
            event: attribute ?? GanttEventValues.Unknown,
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
    target: Element,
    contextItems?: KebabListItem[],
  ) {
    this._markClicked(target);
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
    });
    const overlay = this.overlay.create(configs);
    const contextItemsAttribute = target.getAttribute('gantt-kebab-items');

    if (!contextItems && contextItemsAttribute) {
      contextItems = JSON.parse(contextItemsAttribute);
    }

    contextItems = contextItems?.filter(
      item =>
        !item.permissions ||
        intersection(this._userPermissions, item.permissions).length > 0,
    );

    if (options.contextTemplate && options.viewContainerRef) {
      const item = this._data.find(d => d.id === id);
      overlay.attach(
        new TemplatePortal(options.contextTemplate, options.viewContainerRef, {
          item,
          contextItems,
        }),
      );
    }
    overlay.backdropClick().subscribe(() => {
      overlay.dispose();
      this._unmarkClicked(target);
    });
    this._overlays.push(overlay);
  }

  private _hoverEventHandler(
    event: MouseEvent,
    options: GanttRenderOptions<T>,
  ) {
    if (event.target && isHTMLELement(event.target) && options.showTooltip) {
      // const target = event.target.closest('[gantt-hover]');
      // // const attribute = target?.getAttribute('gantt-hover')!;
      // if (target) {
      //   switch (attribute) {
      //     case GanttEventValues.Tooltip:
      //       this._openTooltip(target, GanttEventTypes.Hover, options, event);
      //       return;
      //     case GanttEventValues.OpenedTooltip:
      //       return;
      //   }
      // }
    }
    this._tooltipClose(event.target, GanttEventTypes.Hover);
  }

  private _openTooltip(
    target: Element,
    event: GanttEventTypes,
    options: GanttRenderOptions<T>,
    e: MouseEvent,
  ) {
    const component = target.getAttribute('gantt-tooltip-component');

    if (this._tooltipOverlay) {
      this._tooltipClose(target, event);
    }

    const bottomOffset = options.tooltipOffset;
    const elementPosition = target.getBoundingClientRect().left;

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(target)
      .withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: bottomOffset,
          offsetX: e.clientX - elementPosition - DIGITS.FIVE,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetX: e.clientX - elementPosition - DIGITS.FIVE,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: bottomOffset,
          offsetX: e.clientX - elementPosition - DIGITS.FIVE,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetX: e.clientX - elementPosition - DIGITS.FIVE,
        },
      ]);
    const configString = target.getAttribute('gantt-tooltip-config');
    let tooltipConfig = {
      panelClass: ['gantt-tooltip-overlay'],
      positionStrategy,
    };
    if (configString) {
      const config = JSON.parse(configString);
      tooltipConfig = {
        ...tooltipConfig,
        ...config,
      };
    }
    const configs = new OverlayConfig(tooltipConfig);

    this._tooltipOverlay = this.overlay.create(configs);
    this._tooltipOpenEvent = event;

    let tooltipData;
    const dataAttributeValue = target.getAttribute('gantt-tooltip-data');
    const idAttributeValue = target.getAttribute('gantt-tooltip-data-row-id');
    if (dataAttributeValue) {
      tooltipData = JSON.parse(dataAttributeValue);
    } else if (idAttributeValue) {
      tooltipData = {
        item: this.gantt.getTask(idAttributeValue),
      };
    } else {
      // do nothing
    }
    const topOffset = 15;
    if (tooltipData) {
      const tooltipRef = this._tooltipOverlay.attach(
        new ComponentPortal(GanttTooltipComponent),
      );
      tooltipRef.location.nativeElement.setAttribute('gantt-hover');
      this._buildPadAround(tooltipRef.location.nativeElement, topOffset);
      Object.assign(tooltipRef.instance, tooltipData);
      this._tooltipOverlay.backdropClick().subscribe(() => {
        this._tooltipOverlay?.dispose();
      });
    } else {
      this._tooltipOverlay.dispose();
    }
  }

  convertToObservable<T>(eventName: GanttEventName) {
    return fromEventPattern<T>(handler => {
      this.gantt.attachEvent(
        eventName,
        (id, e) => {
          handler(id, e);
        },
        {},
      );
    });
  }

  private _buildPadAround(
    element: HTMLElement,
    top = DEFAULT_TOP_OFFSET,
    bottom = DEFAULT_BOTTOM_OFFSET,
  ) {
    element.style.paddingTop = `${top}px`;
    element.style.paddingBottom = `${bottom}px`;
  }

  private _tooltipClose(element: EventTarget | null, event: GanttEventTypes) {
    if (element === this._tooltipOverlay?.hostElement) {
      return;
    }
    if (event !== this._tooltipOpenEvent) {
      return;
    }
    this._tooltipOverlay?.dispose();
  }

  private _closeOverlays() {
    this._overlays.forEach(o => o.dispose());
    this._overlays = [];
    this._tooltipOverlay?.dispose();
    this._tooltipOverlay = undefined;
    this._tooltipOpenEvent = undefined;
  }

  private _buildLabelObject(id: string) {
    return {
      id: id,
      start_date: new Date(),
      end_date: new Date(),
      name: id,
      hasChildren: true,
      isParent: true,
      allocation: 0,
      $open: true,
      payload: {},
      barClasses: ['remove'],
      isLabel: true,
      row_height: PARENT_ROW_HEIGHT_HEADINGS,
      rowClasses: ['border '],
    };
  }

  // to keep the kebab visible while the menu is open
  private _markClicked(target: Element) {
    if (!isHTMLELement(target)) {
      return;
    }
    target.parentElement?.classList.add('clicked-gantt-item');
  }
  private _unmarkClicked(target: Element) {
    if (!isHTMLELement(target)) {
      return;
    }
    target.parentElement?.classList.remove('clicked-gantt-item');
  }
  private _isHTMLElement(target: Element): target is HTMLElement {
    return !!(target as HTMLElement).parentElement;
  }

  private _setGanttStartAndEndDates(options: GanttRenderOptions<T>) {
    const range = this.gantt.getSubtaskDates();
    if (range.start_date && range.end_date) {
      const today = new Date();
      today.setDate(today.getDate() + BUFFER_FOR_TODAY);
      // as per requirement, need to always show current date in gantt
      if (!options.ganttStartDate) {
        this.gantt.config.start_date = new Date(
          Math.min(range.start_date.getTime(), today.getTime()),
        );
      }
      if (this._options?.ganttStartDate) {
        this.gantt.config.start_date = this._options.ganttStartDate!;
      }
      this.gantt.config.end_date = new Date(
        Math.max(range.end_date.getTime(), today.getTime()),
      );
    }
  }

  private _expandGanttBar(target: Element, options: GanttRenderOptions<T>) {
    let dataAttribute: GanttTaskValue<T> | undefined;
    const ganttRowIdAttribute = target.getAttribute('gantt-row-id');
    const ganttRowAttribute = target.getAttribute('gantt-row');
    if (ganttRowAttribute) {
      dataAttribute = JSON.parse(ganttRowAttribute);
    } else if (ganttRowIdAttribute) {
      dataAttribute = this.gantt.getTask(ganttRowIdAttribute);
    } else {
      // do nothing
    }

    if (dataAttribute) {
      const parentTaskId = dataAttribute.parent;

      if (parentTaskId) {
        const parentTask = this.gantt.getTask(parentTaskId);
        const task = this.gantt.getTask(dataAttribute.id);

        this._setBarHeight(parentTask, task, dataAttribute, options);

        task.$open = !task.$open;

        this.gantt.updateTask(parentTaskId as string, parentTask);
        this.gantt.updateTask(dataAttribute.id as string, task);

        this.rerender(false);
      }
    }
  }

  private _setBarHeight(
    parentTask: GanttTaskValue<T>,
    task: GanttTaskValue<T>,
    dataAttribute: GanttTaskValue<T>,
    options: GanttRenderOptions<T>,
  ) {
    const rowConfig = options.ganttRowConfig;
    const noOfBars = dataAttribute.payload['noOfBars'];

    if (!task.$open) {
      /* If the task is expanded, we need to increase bar height and row height
      of its parent task. If the calculated bar height and row height are more than
      bar height and row height of parent task, we will update the heights of parent task*/
      const barHeight = rowConfig.rowHeight + rowConfig.rowBuffer * noOfBars;
      const rowHeight =
        rowConfig.rowHeight +
        rowConfig.rowBuffer * noOfBars +
        rowConfig.actualRowSize;
      if (
        barHeight > (parentTask.bar_height ?? 0) &&
        rowHeight > (parentTask.row_height ?? 0)
      ) {
        parentTask.bar_height = barHeight;
        parentTask.row_height = rowHeight;
      }
    } else {
      /* If any task is collpased, we will update the height of parent task to
      max height of its opened sibling tasks */

      const siblings = this.gantt
        .getSiblings(dataAttribute.id)
        .map(sibling => this.gantt.getTask(sibling))
        .filter(sibling => sibling.id !== dataAttribute.id && sibling.$open);

      let maxSize = -1;

      parentTask.bar_height = this.gantt.config.bar_height as number;
      parentTask.row_height = this.gantt.config.row_height;

      siblings.forEach(sibling => {
        const siblingBarSize = sibling.payload['noOfBars'];
        if (maxSize < siblingBarSize) {
          maxSize = siblingBarSize;
          parentTask.bar_height =
            rowConfig.rowHeight + rowConfig.rowBuffer * maxSize;
          parentTask.row_height =
            rowConfig.rowHeight +
            rowConfig.rowBuffer * maxSize +
            rowConfig.actualRowSize;
        }
      });
    }
  }

  fitToScreen() {
    const maxMinDates = this.gantt.getSubtaskDates();
    const ganttArea =
      this.gantt['$layout'].$gantt.$task.getBoundingClientRect();
    const noOfColumns = Math.floor(ganttArea.width / COLUMN_WIDTH);
    const noOfDays = this.dateOperationService.getNumberOfDaysBetweenDates(
      maxMinDates.start_date,
      maxMinDates.end_date,
    );
    const noOfWeeks = this.dateOperationService.calculateWeeksBetweenDates(
      maxMinDates.start_date,
      maxMinDates.end_date,
    );
    const noOfMonths = this.dateOperationService.getNumberOfMonthsBetweenDates(
      maxMinDates.start_date,
      maxMinDates.end_date,
    );

    switch (true) {
      case noOfDays < noOfColumns:
        this.setScale(Timelines.Weekly);
        break;
      case noOfWeeks < noOfColumns:
        this.setScale(Timelines.Monthly);
        break;
      case noOfMonths < noOfColumns:
        this.setScale(Timelines.Quarterly);
        break;
      default:
        this.setScale(Timelines.Yearly);
    }
  }

  zoomOut() {
    const currentIndex = TimelineArray.indexOf(this._selectedScale);
    if (currentIndex < TimelineArray.length - 1) {
      this.setScale(TimelineArray[currentIndex + 1]);
    }
  }

  zoomIn() {
    const currentIndex = TimelineArray.indexOf(this._selectedScale);
    if (currentIndex > 0) {
      this.setScale(TimelineArray[currentIndex - 1]);
    }
  }
}
