import {
  AfterViewInit,
  Component,
  ElementRef,
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
} from '@project-lib/components/gantt';
import {Item, empData} from '@project-lib/components/gantt/model/item.model';
import {AnyObject} from '@project-lib/core/api';
import {gantt} from 'dhtmlx-gantt';
import {BehaviorSubject, takeUntil} from 'rxjs';

@Component({
  selector: 'arc-gantt',
  templateUrl: './gantt.component.html',
  styleUrls: ['./gantt.component.scss'],
  providers: [
    GanttProviders,
    {
      provide: GanttAdapter,
      useClass: CustomGanttAdapter,
    },
  ],
})
export class GanttComponent<T extends AnyObject>
  implements GanttRenderOptions<T>
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

  private initializeGantt(): void {
    gantt.config.scale_unit = 'year';
    gantt.config.date_scale = '%Y';
    gantt.config.subscales = [
      {unit: 'month', step: 1, date: '%F'},
      {unit: 'week', step: 1, date: 'Week %W'},
    ];
    gantt.config.start_date = new Date();
    gantt.config.end_date = new Date(
      gantt.config.start_date.getFullYear() + 1,
      0,
      1,
    );

    gantt.init(this.ganttContainer.nativeElement);

    gantt.parse({
      data: [
        {
          id: 1,
          text: 'Project #1',
          start_date: '01-04-2023',
          duration: 365,
          progress: 0.6,
        },
        {
          id: 2,
          text: 'Task #1',
          start_date: '01-04-2023',
          duration: 30,
          progress: 0.6,
          parent: 1,
        },
        {
          id: 3,
          text: 'Task #2',
          start_date: '01-05-2023',
          duration: 60,
          progress: 0.6,
          parent: 1,
        },
      ],
    });
  }

  // data for tooltip component
  itemData: Item = {
    allocatedHours: 1600,
    billingRate: 100,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    allotedDeals: [
      {name: 'Deal 1', allocatedHours: 800, status: 'approved'},
      {name: 'Deal 2', allocatedHours: 900, status: 'pending'},
    ],
  };

  allocationMap = new Map<string, boolean>([
    ['Deal 1', true],
    ['Deal 2', false],
  ]);

  // Data for GanttColumnComponent
  items: empData[] = [
    {
      name: 'john Doe teena',
      subtitle: 'Manager',
      hasChildren: false,
      isParent: false,
      $open: false,
      overallocated: false,
    },
    {
      name: 'kelly',
      subtitle: 'Assistant Manager',
      hasChildren: false,
      isParent: false,
      $open: false,
      overallocated: false,
    },
    {
      name: 'Clove',
      subtitle: 'Software Developer',
      hasChildren: false,
      isParent: false,
      $open: false,
      overallocated: false,
    },
    {
      name: 'Classy',
      subtitle: 'DevOps',
      hasChildren: false,
      isParent: false,
      $open: false,
      overallocated: false,
    },
  ];

  allocationTypes = {
    PlaceholderResource: 'PlaceholderResource',
  };

  allocationBase = 40;

  item: Item = {
    type: 'ActualResource',
    allocation: 32,
    payload: {dealStage: 'closedwon', billingRate: 100},
    classes: ['example-class'],
    subAllocations: [
      {percent: 50, allocation: 16, allocatedHours: 16, classes: ['class1']},
      {percent: 50, allocation: 16, allocatedHours: 16, classes: ['class2']},
    ],
  };
  headerDesc = true;
  headerName = 'Dynamic Project Gantt';
  headerSearchPlaceholder = 'Search your tasks';
  headerShowSearch = true;
}
