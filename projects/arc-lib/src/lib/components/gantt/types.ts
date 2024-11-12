import {TemplateRef, Type, ViewContainerRef} from '@angular/core';
import {AnyObject} from '@project-lib/core/api';
import {
  DIGITS,
  MAX_ALLOCATION,
  ONE_DAY,
  ONE_MIN,
  PERCENT,
} from '@project-lib/core/constants';
import {NbMenuItem} from '@nebular/theme';
import {RANDOM_SIZE} from './const';
import {gantt} from 'dhtmlx-gantt';
import {GanttService} from './services';

/**
 * `GanttTaskValue` is a type that represents a task in the Gantt chart.
 *
 * The `GanttTaskValue` type is a generic type, which means that it can be used to represent a task
 * with any type of payload.
 *
 * The `GanttTaskValue` type has the following properties:
 *
 * @property {number} id - The unique identifier for the task.
 * @property {Date} start_date - The start date of the task.
 * @property {Date} end_date - The end date of the task.
 * @property {string} name - The name of the task.
 * @property {string} subtitle - A subtitle for the task.
 * @property render - This is used to render the task as a split task.
 * @property {number} parent - The id of the parent task.
 * @property {number} allocation - The percentage of the parent task that this task takes up.
 * @property {string} type - The type of the task. This is used to determine the color of the task.
 * @property {T} payload - This is the data that you want to pass to the task.
 * @property {boolean} open - This is a property that is used by the Gantt component to determine
 * whether or not the task is expanded.
 * @property {boolean} hasChildren - This is a boolean value that indicates whether the task has
 * children.
 */
export type GanttTaskValue<T> =
  | GanttTaskValueWithAllocation<T>
  | GanttTaskValueWithSubAllocation<T>;

export interface BaseTaskValue<T> {
  id: string | number;
  start_date: Date;
  end_date: Date;
  name: string;
  subtitle?: string;
  render?: 'split';
  parent?: string | number;
  type: string | number;
  $open?: boolean;
  hasChildren: boolean;
  isParent: boolean;
  overallocated?: boolean;
  bar_height?: number;
  row_height?: number;
  payload: T;
  classes?: string[];
}

export function withSuballocations<T>(
  task: GanttTaskValueWithSubAllocation<T> | GanttTaskValueWithAllocation<T>,
): task is GanttTaskValueWithSubAllocation<T> {
  return (
    (task as GanttTaskValueWithSubAllocation<T>).subAllocations !== undefined
  );
}

export interface GanttTaskValueWithAllocation<T> extends BaseTaskValue<T> {
  allocation: number;
}

export interface GanttTaskValueWithSubAllocation<T> extends BaseTaskValue<T> {
  subAllocations: SubAllocation[];
}

export type GanttScaleService<T extends AnyObject = AnyObject> = {
  scale: Timelines;
  config(options?: GanttScaleOptions): {
    unit: string;
    step: number;
    format: (date: Date) => string;
    css?: (date: Date) => string;
  }[];
  scroll(forward: boolean, ganttService: GanttService<T>): void;
  moveToToday(ganttService: GanttService<T>): void;
};

// will be required for custom scale
export type GanttScaleOptions = unknown;

export type ContextItemClickEvent<T> = {
  event: NbMenuItem;
  task: GanttTaskValue<T>;
};

export type GanttEvent<T> = {
  event: string;
  task: GanttTaskValue<T>;
};

export type GanttRenderOptions<T = AnyObject> = {
  contextItems: NbMenuItem[];
  contextTemplate?: TemplateRef<AnyObject>;
  // toolTip?: Type<ITooltipComponent<T>>;
  viewContainerRef?: ViewContainerRef;
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
  markToday: boolean;
  showTooltip?: boolean;
  showBillingRate?: boolean;
  groupings?: string[];
  childIndent: boolean;
  // tooltipComponents: Record<string, Type<ITooltipComponent<AnyObject>>>;
  tooltipOffset?: number;
  infiniteScroll: boolean;
  batchSize?: number;
  searchPlaceholder?: string;
  showSearch: boolean;
  ganttStartDate?: Date;
  kebabOption: (task: GanttTaskValue<T>) => KebabListItem[];
  ganttRowConfig: GanttRowConfig;
};
export type GanttAllocationFields = {
  startDate: Date;
  endDate: Date;
  allocation: number;
};

export type GanttLib = typeof gantt;

export enum Timelines {
  Weekly,
  Monthly,
  Quarterly,
  Custom,
  Yearly,
}

export const GanttTimelineMap: {
  [key in Timelines]: string;
} = {
  [Timelines.Weekly]: 'Weekly',
  [Timelines.Monthly]: 'Monthly',
  [Timelines.Quarterly]: 'Quarterly',
  [Timelines.Custom]: 'Custom',
  [Timelines.Yearly]: 'Yearly',
};
export abstract class GanttAdapter<T> {
  abstract adaptFrom(data: T[]): GanttTaskValue<T>[];

  /**
   * "Given a date, return a new date that is one day later."
   *
   * The first line of the function is a comment. Comments are ignored by the compiler
   * @param {Date} date - The date to be incremented
   * @returns A new Date object with the date set to the next day.
   */
  protected _nextDay(date: Date) {
    return new Date(date.setDate(date.getDate() + 1));
  }

  /**
   * It takes a date string or a Date object, converts it to a Date object, and then adds the timezone
   * offset to it
   * @param {string | Date} date - string | Date
   * @returns A new Date object with the timezone offset added to the time.
   */
  protected _addTimezoneOffset(date: string | Date) {
    const dateObject = new Date(date);
    return new Date(
      dateObject.getTime() + dateObject.getTimezoneOffset() * ONE_MIN,
    );
  }

  protected _randomId() {
    return Math.random()
      .toString(RANDOM_SIZE)
      .substring(DIGITS.TWO, DIGITS.NINE);
  }
}

export class CustomGanttAdapter<T> extends GanttAdapter<T> {
  // Implement the abstract method adaptFrom
  // adaptFrom(): GanttTaskValue<T>[] {
  //   // Your implementation logic here to adapt data to GanttTaskValue
  //   // ...

  //   return;
  // }
  adaptFrom(data: any[]): GanttTaskValue<any>[] {
    const result: GanttTaskValue<any>[] = [];
    data.forEach(sow => {
      let startDate: Date | undefined;
      let endDate: Date | undefined;
      const resourceWiseMap = new Map<
        string,
        GanttTaskValueWithSubAllocation<any>[]
      >();
      for (let allocation of sow.allocations ?? []) {
        allocation.startDate = this._addTimezoneOffset(allocation.startDate);
        allocation.endDate = this._nextDay(
          this._addTimezoneOffset(allocation.endDate),
        );
        if (!startDate || allocation.startDate < startDate) {
          startDate = allocation.startDate;
        }
        if (!endDate || allocation.endDate > endDate) {
          endDate = allocation.endDate;
        }
        const task: GanttTaskValueWithSubAllocation<any> = {
          start_date: allocation.startDate,
          end_date: allocation.endDate,
          name: allocation.name,
          subtitle: allocation.roleName,
          type: allocation.type,
          payload: {...allocation, billingType: sow?.billingType},
          id: allocation.id ?? '',
          hasChildren: false,
          isParent: false,
          subAllocations: [],
        };
        this._checkForShadowAllocation(task, allocation);
        if (allocation.allocationPerDay) {
          const {overallocated, allocations, min, max} =
            this._findOverAllocationRanges(allocation, sow?.currency?.symbol);
          task.subAllocations = allocations;
          task.overallocated = overallocated;
          task.start_date = new Date(min);
          task.end_date = new Date(max);
        }
        resourceWiseMap.set(
          allocation.resourceId,
          (resourceWiseMap.get(allocation.resourceId) ?? []).concat(task),
        );
      }
      const task: GanttTaskValue<any> = {
        start_date: startDate ?? sow.startDate ?? new Date(),
        end_date: endDate ?? sow.endDate ?? new Date(),
        name: sow.name,
        allocation: 0,
        type: 'SOW',
        payload: sow,
        id: sow.id!,
        hasChildren: true,
        isParent: true,
        $open: true,
      };

      // add mock allocation for staggered subtask
      // this._pushDummyParentForStaggeredAllocations(
      //   resourceWiseMap,
      //   result,
      //   sow.id!,
      // );

      // no row if no allocations for a project
      if (sow.allocations?.length) {
        result.push(task);
      }
    });
    return result;
  }

  private _checkForShadowAllocation(
    task: GanttTaskValueWithSubAllocation<any>,
    allocation: any,
  ) {}

  private _findOverAllocationRanges(item: any, currency?: string) {
    let allocations: SubAllocation[] = [];
    let overallocated = false;
    let min = 0;
    let max = 0;
    if (!item.allocationPerDay?.length) {
      return {
        overallocated,
        allocations: [
          {
            percent: PERCENT,
            allocation: item.allocation,
          },
        ],
        min: new Date(item.startDate).getTime(),
        max: new Date(item.endDate).getTime(),
      };
    }

    let suballocations: any[] = item.allocationPerDay;
    suballocations.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );
    min = new Date(suballocations[0].date).getTime();
    max =
      new Date(suballocations[suballocations.length - 1].date).getTime() +
      ONE_DAY; // one day added because gantt is drawn upto 0:00 of the next day
    const duration = (max - min) / ONE_DAY;
    let lastInstance: SubAllocation<any> | undefined;
    enum STATE {
      OVERALLOCATED,
      NONOVERALLOCATION,
    }
    let state: STATE = STATE.NONOVERALLOCATION;
    for (let suballocation of suballocations) {
      let {allocatedHours, allotedDeals} = this._getAllotedDeals(
        suballocation,
        item.dealId,
      );
      overallocated =
        overallocated || this._checkIfOverallocated(suballocation); // if any day is overallocated, then the whole allocation is overallocated
      switch (state) {
        case STATE.OVERALLOCATED:
          if (suballocation.totalAllocation <= MAX_ALLOCATION) {
            state = STATE.NONOVERALLOCATION;
            lastInstance = this._createLastInstance(
              duration,
              suballocation.totalAllocation,
              suballocation.date,
              item.billingRate,
              allocatedHours,
              allotedDeals,
              currency,
            );
            allocations.push(lastInstance);
          } else {
            this._updateLastInstance(duration, lastInstance);
          }
          break;
        case STATE.NONOVERALLOCATION:
          if (suballocation.totalAllocation > MAX_ALLOCATION) {
            state = STATE.OVERALLOCATED;
            lastInstance = this._createLastInstance(
              duration,
              suballocation.totalAllocation,
              suballocation.date,
              item.billingRate,
              allocatedHours,
              allotedDeals,
              currency,
            );
            allocations.push(lastInstance);
            // update and check in one go
          } else if (!this._updateLastInstance(duration, lastInstance)) {
            lastInstance = this._createLastInstance(
              duration,
              suballocation.totalAllocation,
              suballocation.date,
              item.billingRate,
              allocatedHours,
              allotedDeals,
              currency,
            );
            allocations.push(lastInstance);
          } else {
            // do nothing
          }
          break;
      }
    }

    return {
      allocations,
      overallocated,
      min: this._addTimezoneOffset(new Date(min)),
      max: this._addTimezoneOffset(new Date(max)),
    };
  }

  private _updateLastInstance(
    duration: number,
    lastInstance?: SubAllocation<any>,
  ) {
    if (lastInstance) {
      const prevCount = (lastInstance.percent * duration) / PERCENT;
      lastInstance.percent = ((prevCount + 1) / duration) * PERCENT;
      lastInstance.endDate = this._nextDay(lastInstance.endDate);
      return true;
    }
    return false;
  }
  private _createLastInstance(
    duration: number,
    allocation: number,
    date: Date,
    billingRate: number,
    allocatedHours: number,
    allotedDeals: any,
    currency?: string,
  ) {
    return {
      percent: (DIGITS.ONE / duration) * PERCENT,
      allocation,
      startDate: this._addTimezoneOffset(date),
      endDate: this._addTimezoneOffset(date),
      billingRate,
      allocatedHours,
      allotedDeals,
      currency,
    };
  }
  private _checkIfOverallocated(suballocation: any): boolean {
    throw new Error('Method not implemented.');
  }

  private _getAllotedDeals(suballocation: any, dealId: string) {
    let allocatedHours = 0;
    const allotedDeals: any = [];

    suballocation.allocations.forEach(allocation => {
      if (allocation.dealId === dealId) {
        allocatedHours = allocation.allocation;
      }
      allotedDeals.push({
        name: allocation.deal?.name!,
        allocatedHours: allocation.allocation,
        billingRate: allocation.billingRate,
        status: allocation.deal?.status,
      });
    });
    return {allocatedHours, allotedDeals};
  }
  // You can optionally override or use the inherited protected methods
  protected _nextDay(date: Date) {
    // Custom implementation or call the parent method
    return super._nextDay(date);
  }

  protected _addTimezoneOffset(date: string | Date) {
    // Custom implementation or call the parent method
    return super._addTimezoneOffset(date);
  }

  protected _randomId() {
    // Custom implementation or call the parent method
    return super._randomId();
  }
}

export type CustomMouseEvent = {
  target: HTMLElement;
};

export type IColumnComponent<T> = {
  item: GanttTaskValue<T>;
  contextItems: NbMenuItem[];
  active: boolean;
  showKebab?: boolean;
  showParentInitials: boolean;
  showChildInitials: boolean;
  showOverallocatedIcon: boolean;
  contextItemFilter?: ContextItemFilter<T>;
};

export type IBarComponent<T> = {
  item: GanttTaskValue<T>;
};

export type GanttRowConfig = {
  rowHeight: number;
  actualRowSize: number;
  rowBuffer: number;
};

export const TimelineArray: Timelines[] = [
  Timelines.Weekly,
  Timelines.Monthly,
  Timelines.Quarterly,
  Timelines.Yearly,
];
export interface KebabListItem extends NbMenuItem {
  itemClass?: string[];
  iconClass?: string[];
  titleClass?: string[];
  permissions?: string[];
  tooltipData?: string;
  disabled?: boolean;
}

export type SubAllocation<T = AnyObject> = {
  percent: number;
  allocation: number;
  classes?: string[];
} & T;

export type ContextItemFilter<T> = (item: GanttTaskValue<T>) => NbMenuItem[];

export function hasSubAllocation<T>(
  item: GanttTaskValue<T>,
): item is GanttTaskValueWithSubAllocation<T> {
  return !!(item as GanttTaskValueWithSubAllocation<T>).subAllocations;
}
