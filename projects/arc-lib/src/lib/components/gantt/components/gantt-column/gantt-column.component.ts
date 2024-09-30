import {Component, Input} from '@angular/core';
import {empData} from '../../model/item.model';

@Component({
  selector: 'arc-gantt-column',
  templateUrl: './gantt-column.component.html',
  styleUrls: ['./gantt-column.component.scss'],
})
export class GanttColumnComponent {
  @Input()
  items: empData[];

  @Input()
  showParentInitials: boolean;

  @Input()
  showChildInitials: boolean;

  @Input()
  showOverallocatedIcon: boolean;
}
