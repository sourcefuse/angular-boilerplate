import { Injectable } from '@angular/core';
import { GanttScaleUnits } from '../../enum';
import { GanttScaleService, Timelines } from '../../types';

@Injectable()
export class WeeklyScaleService implements GanttScaleService {
  scale = Timelines.Weekly;
  config() {
    return [
      {
        unit: GanttScaleUnits.Week,
        step: 1,
        format: (date: Date) => this._formatWeeklyScale(date),
      },
      {
        unit: GanttScaleUnits.Day,
        step: 1,
        format: (date: Date) =>
          date.toLocaleString('default', { weekday: 'short' }).charAt(0),
        css: (date: Date) => this._attachWeekendClass(date),
      },
    ];
  }

  private _formatWeeklyScale(date: Date) {
    const noOfDigits = 2;
    return `${date.toLocaleString('default', { month: 'short' })} ${date
      .getDate()
      .toString()
      .padStart(noOfDigits, '0')}, ${date.toLocaleString('default', {
      year: 'numeric',
    })}`;
  }

  private _attachWeekendClass(date: Date) {
    const lastDay = 6;
    if (date.getDay() == 0 || date.getDay() == lastDay) {
      return 'weekend';
    } else {
      return 'weekday';
    }
  }
}
