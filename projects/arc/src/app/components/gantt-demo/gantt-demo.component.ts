import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {NbMenuItem, NbSidebarService} from '@nebular/theme';
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
import {GanttScaleUnits} from '@project-lib/components/gantt/enum';
import {Item, empData} from '@project-lib/components/gantt/model/item.model';
import {AnyObject} from '@project-lib/core/api';
import {gantt} from 'dhtmlx-gantt';
import {takeUntil, switchMap, tap, map} from 'rxjs';

@Component({
  selector: 'arc-gantt-demo',
  templateUrl: './gantt-demo.component.html',
  styleUrls: ['./gantt-demo.component.scss'],
  providers: [
    GanttProviders,
    {
      provide: GanttAdapter,
      useClass: CustomGanttAdapter,
    },
  ],
})
export class GanttDemoComponent<T extends AnyObject>
  implements GanttRenderOptions<T>
{
  // data for tooltip component
  showTooltip = false;
  selectedItem: Item;

  constructor(public readonly viewContainerRef: ViewContainerRef) {}
  contextItems: NbMenuItem[];
  contextTemplate?: TemplateRef<AnyObject>;
  columnName?: string;
  showKebab?: boolean;
  showParentInitials: boolean;
  showChildInitials: boolean;
  columnComponent: Type<IColumnComponent<T>>;
  barComponent: Type<IBarComponent<T>>;
  columnWidth: number;
  resizer: boolean;
  sorting: boolean;
  moveToToday: boolean;
  highlightRange?: [Date, Date];
  showOverallocatedIcon: boolean;
  showNonBillableIcon: boolean;
  contextItemFilter?: ContextItemFilter<T>;
  defaultScale: Timelines;
  sidebarItems: empData[] = []; // Load or set your sidebar items here
  // allocationTypes: any;
  // allocationBase: number;
  markToday: boolean;
  showBillingRate?: boolean;
  groupings?: string[];
  childIndent: boolean;
  tooltipOffset?: number;
  infiniteScroll: boolean;
  batchSize?: number;
  searchPlaceholder?: string;
  showSearch: boolean;
  ganttStartDate?: Date;
  kebabOption: (task: GanttTaskValue<T>) => KebabListItem[];
  ganttRowConfig: GanttRowConfig;
  itemData: Item = {
    allocatedHours: 1600,
    billingRate: 100,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    // allotedDeals: [
    //   {name: 'Deal 1', allocatedHours: 800, status: 'approved'},
    //   {name: 'Deal 2', allocatedHours: 900, status: 'pending'},
    // ],
  };

  allocationMap = new Map<string, boolean>([
    ['Deal 1', true],
    ['Deal 2', false],
  ]);

  // Data for GanttColumnComponent
  items: empData[] = [
    {
      name: 'john Doe ',
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

  item: any = {
    type: 'ActualResource',
    allocation: 32,
    payload: {dealStage: 'closedwon', billingRate: 100},
    classes: ['example-class'],
    subAllocations: [
      {percent: 50, allocation: 20, allocatedHours: 20, classes: ['class1']},
      {percent: 50, allocation: 15, allocatedHours: 15, classes: ['class2']},
    ],
  };

  // Data for GanttHeaderComponent
  headerDesc = true;
  headerName = 'Dynamic Project Gantt';
  headerSearchPlaceholder = 'Search your tasks';
  headerShowSearch = true;

  onSidebarItemSelected(item: Item): void {
    this.selectedItem = this.convertToItem(item);
    console.log(item);
  }

  // Helper function to convert empData to Item if needed
  convertToItem(empItem: Item): Item {
    return {
      allocatedHours: 40,
      billingRate: 100,
      startDate: new Date(),
      endDate: new Date(),
    };
  }
}
