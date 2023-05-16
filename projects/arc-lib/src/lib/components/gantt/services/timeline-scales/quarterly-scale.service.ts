import { Injectable } from '@angular/core';
import { MONTHS_IN_QUARTER } from '../../const';
import { GanttScaleUnits } from '../../enum';
import { GanttScaleService, Timelines } from '../../types';

@Injectable()
export class QuarterlyScaleService implements GanttScaleService {
  scale = Timelines.Quarterly;
  config() {
    return [
      {
        unit: GanttScaleUnits.Quarter,
        step: 1,
        format: (date: Date) => this._formatQuarterScale(date),
      },
      {
        unit: GanttScaleUnits.Month,
        step: 1,
        format: (date: Date) =>
          date.toLocaleString('default', { month: 'short' }),
      },
    ];
  }

  private _formatQuarterScale(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    return `Q${Math.ceil((month + 1) / MONTHS_IN_QUARTER)} ` + year;
  }
}
