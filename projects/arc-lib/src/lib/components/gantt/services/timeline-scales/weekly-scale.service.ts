import {Injectable} from '@angular/core';
import {GanttScaleUnits} from '../../enum';
import {GanttScaleService, Timelines} from '../../types';
import {AnyObject} from '@project-lib/core/api';
import {DIGITS} from '@project-lib/core/constants';
import {GanttService} from '../gantt.service';

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
          date.toLocaleString('default', {weekday: 'short'}).charAt(0),
        css: (date: Date) => this._attachWeekendClass(date),
      },
    ];
  }

  scroll(forward: boolean, ganttService: GanttService<AnyObject>): void {
    const currentScrollState: number = ganttService.gantt.getScrollState().x;
    const currentScrollDate: Date =
      ganttService.gantt.dateFromPos(currentScrollState);
    const newScrollDate: Date = ganttService.gantt.date.add(
      currentScrollDate,
      forward ? +DIGITS.ONE : -DIGITS.ONE,
      'week',
    );
    const newScrollState: number =
      ganttService.gantt.posFromDate(newScrollDate);
    ganttService.gantt.scrollTo(newScrollState, null);
  }
  moveToToday(ganttService: GanttService<AnyObject>): void {
    const dateToday: Date = new Date();
    const newScrollDate: Date = ganttService.gantt.date.add(
      dateToday,
      -DIGITS.ONE,
      'week',
    );
    const newScrollState: number =
      ganttService.gantt.posFromDate(newScrollDate);
    ganttService.gantt.scrollTo(newScrollState, null);
  }
  private _formatWeeklyScale(date: Date) {
    const noOfDigits = 2;
    return `${date.toLocaleString('default', {month: 'short'})} ${date
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
