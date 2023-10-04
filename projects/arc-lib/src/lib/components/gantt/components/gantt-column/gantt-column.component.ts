import {Component, Input} from '@angular/core';
import {AnyObject} from '@project-lib/core/api';
import {NbMenuItem} from '@nebular/theme';
import {ContextItemFilter, GanttTaskValue} from '../../types';

@Component({
  selector: 'gantt-column',
  templateUrl: './gantt-column.component.html',
  styleUrls: ['./gantt-column.component.scss'],
})
export class GanttColumnComponent<T extends AnyObject> {
// //  item :GanttTaskValue<T> = {

// }
  ngOnInit(){
    console.log(this.item);
  }
  @Input()
  item!: GanttTaskValue<T>;

  @Input()
  contextItems: NbMenuItem[] = [];

  @Input()
  active!: boolean;

  @Input()
  showKebab!: boolean;

  @Input()
  showParentInitials!: boolean;

  @Input()
  showChildInitials!: boolean;

  @Input()
  showOverallocatedIcon!: boolean;

  @Input()
  contextItemFilter!: ContextItemFilter<T>;
}
