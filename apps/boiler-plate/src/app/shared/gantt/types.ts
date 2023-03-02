import {TemplateRef, Type, ViewContainerRef} from '@angular/core';
import {AnyObject} from '@boiler/core/api/backend-filter';
import {DIGITS, ONE_MIN} from '@boiler/core/constants';
import {NbMenuItem} from '@nebular/theme';
import {gantt} from 'dhtmlx-gantt';
import {RANDOM_SIZE} from './const';

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

export type GanttScaleService = {
  scale: Timelines;
  config(options?: GanttScaleOptions): {
    unit: string;
    step: number;
    format: (date: Date) => string;
    css?: (date: Date) => string;
  }[];
};

// will be required for custom scale
export type GanttScaleOptions = {};

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
  viewContainerRef?: ViewContainerRef;
  columnName?: string;
  showKebab: boolean;
  showParentInitials: boolean;
  showChildInitials: boolean;
  columnComponent: Type<IColumnComponent<T>>;
  barComponent: Type<IBarComponent<T>>;
  columnWidth: number;
  resizer: boolean;
  searchPlaceholder?: string;
  showSearch: boolean;
  moveToToday: boolean;
  highlightRange?: [Date, Date];
  showOverallocatedIcon: boolean;
  contextItemFilter?: ContextItemFilter<T>;
  defaultScale: Timelines;
  markToday: boolean;
  showTooltip?: boolean;
  childIndent: boolean;
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
}

export const GanttTimelineMap: {
  [key in Timelines]: string;
} = {
  [Timelines.Weekly]: 'Weekly',
  [Timelines.Monthly]: 'Monthly',
  [Timelines.Quarterly]: 'Quarterly',
  [Timelines.Custom]: 'Custom',
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
    let dateObject = new Date(date);
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

export type CustomMouseEvent = {
  target: HTMLElement;
};

export type IColumnComponent<T> = {
  item: GanttTaskValue<T>;
  contextItems: NbMenuItem[];
  active: boolean;
  showKebab: boolean;
  showParentInitials: boolean;
  showChildInitials: boolean;
  showOverallocatedIcon: boolean;
  contextItemFilter?: ContextItemFilter<T>;
};

export type IBarComponent<T> = {
  item: GanttTaskValue<T>;
};

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
