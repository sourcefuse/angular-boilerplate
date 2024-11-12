import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {AllocationBar, Item} from '../../model/item.model';

@Component({
  selector: 'arc-gantt-bars',
  templateUrl: './gantt-bars.component.html',
  styleUrls: ['./gantt-bars.component.scss'],
})
export class GanttBarsComponent {
  @Input() item: any;
  @Input() allocationTypes: any;
  @Input() allocationBase: number;
  showTooltip = -1;

  formatAllocation(value: number): string {
    return `${value} hours`;
  }

  formatter(value: number): string {
    return `$${value}/hour`;
  }

  hasSubAllocation(item: Item): boolean {
    return item.subAllocations && item.subAllocations.length > 0;
  }

  stringify(allocationBar: AllocationBar): string {
    return JSON.stringify(allocationBar);
  }
}
