import {Injectable} from '@angular/core';
import {MONTHS_IN_QUARTER} from '../../const';
import {GanttScaleUnits} from '../../enum';
import {GanttScaleService, Timelines} from '../../types';
import {AnyObject} from '@project-lib/core/api';
import {DIGITS} from '@project-lib/core/constants';
import {GanttService} from '../gantt.service';

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
          date.toLocaleString('default', {month: 'short'}),
      },
    ];
  }
  scroll(forward: boolean, ganttService: GanttService<AnyObject>): void {
    const currentScrollState: number = ganttService.gantt.getScrollState().x;
    const currentScrollDate: Date =
      ganttService.gantt.dateFromPos(currentScrollState);
    const newScrollDate: Date = ganttService.gantt.date.add(
      currentScrollDate,
      forward ? +DIGITS.FOUR : -DIGITS.FOUR,
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
      -DIGITS.FOUR,
      'month',
    );
    const newScrollState: number =
      ganttService.gantt.posFromDate(newScrollDate);
    ganttService.gantt.scrollTo(newScrollState, null);
  }

  private _formatQuarterScale(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    return `Q${Math.ceil((month + 1) / MONTHS_IN_QUARTER)} ` + year;
  }
}
