import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AnyObject } from '@boiler/core/api/backend-filter';
import { ComponentBaseDirective } from '@boiler/core/component-base';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { takeUntil } from 'rxjs';
import { GANTT_COLUMN_WIDTH } from '../const';
import { GanttService } from '../services';
import {
  ContextItemClickEvent,
  ContextItemFilter,
  GanttEvent,
  GanttRenderOptions,
  GanttTaskValue,
  IBarComponent,
  IColumnComponent,
  Timelines,
} from '../types';
import { GanttBarsComponent } from './gantt-bars/gantt-bars.component';
import { GanttColumnComponent } from './gantt-column/gantt-column.component';

@Component({
  selector: 'boiler-gantt',
  templateUrl: './bb-gantt.component.html',
  styleUrls: ['./bb-gantt.component.scss'],
})
export class BbGanttComponent<T extends AnyObject, S extends AnyObject>
  extends ComponentBaseDirective
  implements OnChanges, OnInit, AfterViewInit, OnDestroy, GanttRenderOptions<T>
{
  @ViewChild('gantt', { static: true }) ganttContainer!: ElementRef;

  @Input()
  data!: T[];

  @Input()
  contextItems: NbMenuItem[] = [];

  @Input()
  contextItemFilter!: ContextItemFilter<T>;

  @Output()
  contextItemClick = new EventEmitter<ContextItemClickEvent<T>>();

  @Output()
  event = new EventEmitter<GanttEvent<T>>();

  @Input()
  showParentInitials = false;

  @Input()
  showChildInitials = false;

  @ViewChild('menu', { static: true })
  contextTemplate!: TemplateRef<AnyObject>;

  @Input()
  columnName = 'Employee Name';

  @Input()
  showKebab = true;

  @Input()
  columnWidth = GANTT_COLUMN_WIDTH;

  @Input()
  resizer = true;

  @Input()
  columnComponent: Type<IColumnComponent<T>> = GanttColumnComponent;

  @Input()
  barComponent: Type<IBarComponent<T>> = GanttBarsComponent;

  @Input()
  searchPlaceholder?: string;

  @Input()
  showSearch = true;

  @Input()
  showBorder = true;

  @Input()
  moveToToday = true;

  @Input()
  highlightRange!: [Date, Date];

  @Input()
  showOverallocatedIcon = true;

  @Input()
  defaultScale: Timelines = Timelines.Monthly;

  @Input()
  showGridBorder = true;

  @Input()
  showTooltip = false;

  @Input()
  markToday = true;

  @Input()
  childIndent = true;

  constructor(
    private readonly ganttSvc: GanttService<T, S>,
    private readonly menuService: NbMenuService,
    public readonly viewContainerRef: ViewContainerRef
  ) {
    super();
  }

  ngOnInit() {
    this.menuService
      .onItemClick()
      .pipe(takeUntil(this._destroy$))
      .subscribe((event) => {
        this.contextItemClick.emit({
          event: event.item,
          task: event.tag as unknown as GanttTaskValue<T>,
        });
        this.ganttSvc.closeContextMenu();
      });
    this.ganttSvc.events.pipe(takeUntil(this._destroy$)).subscribe((event) => {
      this.event.emit(event);
    });
  }

  ngOnChanges() {
    this.ganttSvc.feed(this.data);
  }

  ngAfterViewInit() {
    this.ganttSvc.render(this.ganttContainer, this);
  }

  override ngOnDestroy() {
    this.ganttSvc.destroy();
    super.ngOnDestroy();
  }
}
