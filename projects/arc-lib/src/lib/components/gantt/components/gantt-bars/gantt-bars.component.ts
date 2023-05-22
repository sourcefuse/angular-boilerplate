import {Component} from '@angular/core';
import {AnyObject} from '@project-lib/core/api';
import {MAX_ALLOCATION} from '@project-lib/core/constants';
import {TranslationService} from '@project-lib/core/localization';
import {TranslateService} from '@ngx-translate/core';
import {
  GanttTaskValue,
  GanttTaskValueWithSubAllocation,
  SubAllocation,
} from '../../types';

@Component({
  selector: 'gantt-bars',
  templateUrl: './gantt-bars.component.html',
  styleUrls: ['./gantt-bars.component.scss'],
})
export class GanttBarsComponent<T extends AnyObject> {
  item!: GanttTaskValue<T>;
  allocationTypes: any = {};
  allocationBase = MAX_ALLOCATION;
  private translate: TranslateService;
  constructor(private translateSvc: TranslationService) {
    this.translate = translateSvc.translate;
  }

  stringify(subAllocation: SubAllocation) {
    return JSON.stringify(subAllocation);
  }
  formatter(rate: number) {
    return `$${rate}/${this.translate.instant('hr')}`;
  }

  formatAllocation(allocation: number) {
    return `${allocation}${this.translate.instant('h/d')}`;
  }

  hasSubAllocation(
    item: GanttTaskValue<T>,
  ): item is GanttTaskValueWithSubAllocation<T> {
    return !!(item as GanttTaskValueWithSubAllocation<T>).subAllocations;
  }
}
