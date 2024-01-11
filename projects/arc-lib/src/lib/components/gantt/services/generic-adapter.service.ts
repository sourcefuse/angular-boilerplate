import {Injectable} from '@angular/core';
import {GanttAdapter, GanttTaskValue} from '../types';

@Injectable()
export class GenericGanttAdapterService extends GanttAdapter<any> {
  adaptFrom(data: any): GanttTaskValue<any>[] {
    return data.map(item => ({
      start_date: this._addTimezoneOffset(item.startDate),
      end_date: this._addTimezoneOffset(item.endDate),
      name: item.name,
      allocation: item.allocation,
      type: item.type,
      payload: item,
      id: item.id ?? '',
      hasChildren: false,
      isParent: true,
      hasSubAllocations: false,
    }));
  }
}
