import { Component, Input } from '@angular/core';

@Component({
  selector: 'boiler-gantt-header',
  templateUrl: './gantt-header.component.html',
  styleUrls: ['./gantt-header.component.scss'],
})
export class GanttHeaderComponent {
  @Input()
  desc!: boolean;

  @Input()
  name?: string;

  @Input() searchPlaceholder = 'Enter your search here';

  @Input()
  showSearch!: boolean;
}
