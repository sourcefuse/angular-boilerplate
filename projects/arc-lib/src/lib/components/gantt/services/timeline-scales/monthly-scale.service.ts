import { Injectable } from '@angular/core';
import { GanttScaleUnits } from '../../enum';
import { GanttScaleService, Timelines } from '../../types';

@Injectable()
export class MonthlyScaleService implements GanttScaleService {
  scale = Timelines.Monthly;
  config() {
    return [
      {
        unit: GanttScaleUnits.Month,
        step: 1,
        format: (date: Date) =>
          date.toLocaleString('default', { month: 'long', year: 'numeric' }),
      },
      {
        unit: GanttScaleUnits.Week,
        step: 1,
        format: (date: Date) =>
          date.toLocaleString('default', { day: '2-digit' }),
      },
    ];
  }
}
