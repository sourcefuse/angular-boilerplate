import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {
  GanttProviders,
  GanttAdapter,
  CustomGanttAdapter,
  GanttService,
  GanttRenderOptions,
  ContextItemFilter,
  GanttRowConfig,
  GanttTaskValue,
  IBarComponent,
  IColumnComponent,
  KebabListItem,
  Timelines,
  MONTHS_IN_QUARTER,
} from '@project-lib/components/gantt';
import {GanttScaleUnits} from '@project-lib/components/gantt/enum';
import {Item, empData} from '@project-lib/components/gantt/model/item.model';
import {AnyObject} from '@project-lib/core/api';
import {BehaviorSubject, takeUntil} from 'rxjs';
declare let gantt: any;
@Component({
  selector: 'arc-timeline-gantt',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent<T extends AnyObject>
  implements AfterViewInit, GanttRenderOptions<T>
{
  private _data: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  @ViewChild('gantt', {static: true}) ganttContainer!: ElementRef;
  // data for tooltip component
  showTooltip = false;
  selectedItem: Item;
  infiniteScroll = false;
  constructor(
    private readonly ganttSvc: GanttService<AnyObject>,
    public readonly viewContainerRef: ViewContainerRef,
  ) {}
  showParentInitials: boolean;
  showChildInitials: boolean;
  showOverallocatedIcon: boolean;
  ngAfterViewInit(): void {
    this.initializeGantt();
  }

  columnComponent: Type<IColumnComponent<T>>;
  barComponent: Type<IBarComponent<T>>;
  contextItems: NbMenuItem[];
  contextTemplate?: TemplateRef<AnyObject>;
  columnName?: string;
  showKebab?: boolean;
  columnWidth: number;
  resizer: boolean;
  sorting: boolean;
  moveToToday: boolean;
  highlightRange?: [Date, Date];
  showNonBillableIcon: boolean;
  contextItemFilter?: ContextItemFilter<T>;
  defaultScale: Timelines;
  markToday: boolean;
  showBillingRate?: boolean;
  groupings?: string[];
  childIndent: boolean;
  tooltipOffset?: number;
  batchSize?: number;
  searchPlaceholder?: string;
  showSearch: boolean;
  ganttStartDate?: Date;
  kebabOption: (task: GanttTaskValue<T>) => KebabListItem[];
  ganttRowConfig: GanttRowConfig;
  private _formatWeeklyScale(date: Date) {
    const noOfDigits = 2;
    return `${date.toLocaleString('default', {month: 'short'})} ${date
      .getDate()
      .toString()
      .padStart(noOfDigits, '0')}, ${date.toLocaleString('default', {
      year: 'numeric',
    })}`;
  }
  private _formatQuarterScale(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    return `Q${Math.ceil((month + 1) / MONTHS_IN_QUARTER)} ` + year;
  }
  private initializeGantt(): void {
    gantt.config.scale_unit = 'year';
    gantt.config.date_scale = '%Y';
    gantt.config.subscales = [
      {
        unit: GanttScaleUnits.Quarter,
        step: 1,
        format: (date: Date) => this._formatQuarterScale(date),
      },
      {
        unit: GanttScaleUnits.Week,
        step: 1,
        format: (date: Date) => this._formatWeeklyScale(date),
      },
    ];
    gantt.config.start_date = new Date();
    gantt.config.end_date = new Date(
      gantt.config.start_date.getFullYear() + 1,
      0,
      1,
    );

    gantt.config.columns = [];
    gantt.init(this.ganttContainer.nativeElement);
    gantt.parse({
      data: [{}],
    });
  }
}
