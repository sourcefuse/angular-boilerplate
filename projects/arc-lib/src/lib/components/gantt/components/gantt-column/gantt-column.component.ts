import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  // for testing

  @Output() itemSelected = new EventEmitter<empData>();

  onItemClick(item: empData): void {
    this.itemSelected.emit(item);
    console.log('hi tiny');
  }
}
