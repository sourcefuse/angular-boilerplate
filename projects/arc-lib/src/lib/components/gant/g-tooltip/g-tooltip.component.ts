import {Component, Input} from '@angular/core';
import {Item} from '@main-project/boiler/model/item.model';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'arc-g-tooltip',
  templateUrl: './g-tooltip.component.html',
  styleUrls: ['./g-tooltip.component.scss'],
})
export class GTooltipComponent {
  @Input()
  item: Item;

  @Input()
  allocationMap = new Map<string, boolean>([]);

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {}

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  }

  formatter(value: number): string {
    return `$${value}`;
  }

  formatAllocation(hours: number): string {
    return `${hours} hours`;
  }

  displayStatus(status: string): string {
    return status;
  }
}
