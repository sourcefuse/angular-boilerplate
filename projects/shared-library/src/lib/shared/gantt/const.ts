import { InjectionToken } from '@angular/core';
import { Gantt } from 'dhtmlx-gantt/codebase/dhtmlxgantt';
import { GanttService } from './services';
import { GanttLib, GanttScaleService } from './types';

export const GANTT = new InjectionToken<GanttLib>('boiler.gantt.lib');

export const GANTT_SCALES = new InjectionToken<GanttScaleService>(
  'boiler.gantt.scales'
);

export const GanttProviders = [
  GanttService,
  {
    provide: GANTT,
    useFactory: () => Gantt.getGanttInstance(),
  },
];

export function isHTMLELement(element: EventTarget): element is HTMLElement {
  return !!(element as HTMLElement).closest;
}

export const GANTT_TIMELINE_MIN_WIDTH = 500;
export const GANTT_ROW_HEIGHT = 65;
export const GANTT_BAR_HEIGHT = 30;
export const GANTT_SCALE_HEIGHT = 76;
export const GANTT_SCROLL_BAR_HEIGHT = 20;
export const GANTT_COLUMN_WIDTH = 300;
export const RESIZER_WIDTH = 1;
export const BUFFER_FOR_TODAY = 5;

export const MONTHS_IN_QUARTER = 3;
export const RANDOM_SIZE = 36;
