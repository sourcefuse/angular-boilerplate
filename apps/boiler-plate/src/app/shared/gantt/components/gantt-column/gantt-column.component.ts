import {Component, Input} from '@angular/core';
import {AnyObject} from '@boiler/core/api/backend-filter';
import {NbMenuItem} from '@nebular/theme';
import {ContextItemFilter, GanttTaskValue} from '../../types';

@Component({
  selector: 'boiler-gantt-column',
  templateUrl: './gantt-column.component.html',
  styleUrls: ['./gantt-column.component.scss'],
})
export class GanttColumnComponent<T extends AnyObject> {
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
