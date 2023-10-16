import {Component} from '@angular/core';
import {MAX_ALLOCATION} from '@project-lib/core/constants';
import {TranslateService} from '@ngx-translate/core';
import {SubAllocation} from '../../types';

@Component({
  selector: 'gantt-tooltip',
  templateUrl: './gantt-tooltip.component.html',
  styleUrls: ['./gantt-tooltip.component.scss'],
})
export class GanttTooltipComponent {
  item!: SubAllocation;
  maxAllocation = MAX_ALLOCATION;

  constructor(private translate: TranslateService) {}

  formatDate(date: Date) {
    return  date? new Date(date):new Date();
  }

  formatter(rate: number) {
    return `$${rate}/${this.translate.instant('hr')}`;
  }

  formatAllocation(allocation: number) {
    return `${allocation}${this.translate.instant('h/d')}`;
  }
}
