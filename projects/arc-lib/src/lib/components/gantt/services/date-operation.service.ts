import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable()
export class DateOperationService {
  convertToMoment(date: moment.MomentInput) {
    return moment(date);
  }

  getTotalMonths(startDate: moment.Moment, endDate: moment.Moment) {
    let months = 0;
    const date = startDate.clone().startOf('month');
    const end = endDate.clone().endOf('month');
    while (date < end) {
      months++;
      date.add(1, 'month');
    }
    return months;
  }

  calculateWeeksBetweenDates(startDate: Date | string, endDate: Date | string) {
    const startMoment = moment(startDate);
    const endMoment = moment(endDate);
    const totalWeeks = endMoment.diff(startMoment, 'weeks') + 1;
    return totalWeeks;
  }

  getNumberOfDaysBetweenDates(date1: Date, date2: Date): number {
    const momentDate1 = moment(date1);
    const momentDate2 = moment(date2);

    const daysDifference = momentDate2.diff(momentDate1, 'days');

    return daysDifference;
  }

  getNumberOfMonthsBetweenDates(date1: Date, date2: Date): number {
    const momentDate1 = moment(date1);
    const momentDate2 = moment(date2);

    const monthsDifference = momentDate2.diff(momentDate1, 'months') + 1;

    return monthsDifference;
  }
}
