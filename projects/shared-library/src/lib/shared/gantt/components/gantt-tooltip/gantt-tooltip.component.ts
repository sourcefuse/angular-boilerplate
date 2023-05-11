import { Component } from '@angular/core';
import { MAX_ALLOCATION } from '@boiler/core/constants';
import { TranslateService } from '@ngx-translate/core';
import { SubAllocation } from '../../types';

@Component({
  selector: 'boiler-gantt-tooltip',
  templateUrl: './gantt-tooltip.component.html',
  styleUrls: ['./gantt-tooltip.component.scss'],
})
export class GanttTooltipComponent {
  item!: SubAllocation;
  maxAllocation = MAX_ALLOCATION;

  constructor(private translate: TranslateService) {}

  formatDate(date: Date) {
    return new Date(date);
  }

  formatter(rate: number) {
    return `$${rate}/${this.translate.instant('hr')}`;
  }

  formatAllocation(allocation: number) {
    return `${allocation}${this.translate.instant('h/d')}`;
  }
}
