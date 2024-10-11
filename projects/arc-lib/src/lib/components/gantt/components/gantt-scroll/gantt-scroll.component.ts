import {Component, Inject} from '@angular/core';
import {AnyObject} from '@project-lib/core/api';
import {GANTT_SCALES} from '../../const';
import {GanttService} from '../../services';
import {GanttScaleService} from '../../types';

@Component({
  selector: 'arc-gantt-scroll',
  templateUrl: './gantt-scroll.component.html',
  styleUrls: ['./gantt-scroll.component.scss'],
})
export class GanttScrollComponent<T extends AnyObject> {
  constructor(
    private ganttService: GanttService<T>,
    @Inject(GANTT_SCALES)
    private readonly scales: GanttScaleService<T>[],
  ) {}
  scrollBack() {
    const selectedScale = this.ganttService.selectedScale;
    const scale = this.scales.find(s => s.scale === selectedScale);
    scale?.scroll(false, this.ganttService);
  }
  scrollForward() {
    const selectedScale = this.ganttService.selectedScale;
    const scale = this.scales.find(s => s.scale === selectedScale);
    scale?.scroll(true, this.ganttService);
  }
}
