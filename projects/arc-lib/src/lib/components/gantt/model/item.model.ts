import {TemplateRef, ViewContainerRef} from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {AnyObject} from '@project-lib/core/api/backend-filter';
import {Type} from 'typescript';
import {
  IColumnComponent,
  IBarComponent,
  ContextItemFilter,
  Timelines,
  GanttTaskValue,
  KebabListItem,
  GanttRowConfig,
} from '../types';

export interface Deal {
  name: string;
  allocatedHours: number;
  status: string;
}

export interface Item {
  allocatedHours?: number;
  billingRate?: number;
  startDate?: Date;
  endDate?: Date;
  allotedDeals?: Deal[];
  type?: string | number;
  allocation?: number;
  payload?: {[key: string]: any};
  classes?: string[];
  subAllocations?: AllocationBar[];
}

export interface empData {
  name: string;
  subtitle: string;
  hasChildren: boolean;
  isParent: boolean;
  $open: boolean;
  overallocated: boolean;
}

export interface AllocationBar {
  percent: number;
  allocation: number;
  allocatedHours: number;
  classes?: string[];
}

export type GanttOptions<T = AnyObject> = {
  contextItems: NbMenuItem[];
  contextTemplate?: TemplateRef<AnyObject>;
  // toolTip?: Type<ITooltipComponent<T>>;
  viewContainerRef?: ViewContainerRef;
  columnName?: string;
  showKebab?: boolean;
  showParentInitials: boolean;
  showChildInitials: boolean;
  // columnComponent: Type<IColumnComponent<T>>;
  // barComponent: Type<IBarComponent<T>>;
  columnWidth: number;
  resizer: boolean;
  sorting: boolean;
  moveToToday: boolean;
  highlightRange?: [Date, Date];
  showOverallocatedIcon: boolean;
  showNonBillableIcon: boolean;
  contextItemFilter?: ContextItemFilter<T>;
  defaultScale: Timelines;
  markToday: boolean;
  showTooltip?: boolean;
  showBillingRate?: boolean;
  groupings?: string[];
  childIndent: boolean;
  batchSize?: number;
  searchPlaceholder?: string;
  showSearch: boolean;
  ganttStartDate?: Date;
  kebabOption: (task: GanttTaskValue<T>) => KebabListItem[];
  ganttRowConfig: GanttRowConfig;
};
