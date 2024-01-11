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
  @Input()
  item: GanttTaskValue<T> = {
    allocation: 5,
    id: 1,
    start_date: new Date(),
    end_date: new Date(),
    name: 'robin',
    type: '',
    hasChildren: false,
    isParent: true,
    payload: {} as any,
  };

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
