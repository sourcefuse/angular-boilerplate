import {Injectable} from '@angular/core';
import {GanttScaleUnits} from '../../enum';
import {GanttScaleService, Timelines} from '../../types';
import {AnyObject} from '@project-lib/core/api';
import {DIGITS} from '@project-lib/core/constants';
import {GanttService} from '../gantt.service';

@Injectable()
export class MonthlyScaleService implements GanttScaleService {
  scale = Timelines.Monthly;
  config() {
    return [
      {
        unit: GanttScaleUnits.Month,
        step: 1,
        format: (date: Date) =>
          date.toLocaleString('default', {month: 'long', year: 'numeric'}),
      },
      {
        unit: GanttScaleUnits.Week,
        step: 1,
        format: (date: Date) =>
          date.toLocaleString('default', {day: '2-digit'}),
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
      'month',
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
      'month',
    );
    const newScrollState: number =
      ganttService.gantt.posFromDate(newScrollDate);
    ganttService.gantt.scrollTo(newScrollState, null);
  }
}
