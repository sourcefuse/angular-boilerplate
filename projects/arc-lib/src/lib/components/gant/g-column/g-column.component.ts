import {Component, Input} from '@angular/core';
import {empData} from '@main-project/boiler/model/item.model';

@Component({
  selector: 'arc-g-column',
  templateUrl: './g-column.component.html',
  styleUrls: ['./g-column.component.scss'],
})
export class GColumnComponent {
  @Input()
  items: empData[];

  @Input()
  showParentInitials: boolean;

  @Input()
  showChildInitials: boolean;

  @Input()
  showOverallocatedIcon: boolean;
}
