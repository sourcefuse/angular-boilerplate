import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {TranslationService} from '@project-lib/core/localization';
import {GanttService} from '../../services';
import {AnyObject} from '@project-lib/core/api';
import {GanttProviders} from '../../const';
import {CustomGanttAdapter, GanttAdapter} from '../../types';

@Component({
  selector: 'arc-gantt-zoombar',
  templateUrl: './gantt-zoombar.component.html',
  styleUrls: ['./gantt-zoombar.component.scss'],
})
export class GanttZoomBarComponent<T extends AnyObject> {
  translate: TranslateService;
  constructor(
    private ganttService: GanttService<T>,
    private readonly translationService: TranslationService,
  ) {
    this.translate = this.translationService.translate;
  }

  zoomIn() {
    this.ganttService.zoomIn();
  }

  zoomOut() {
    this.ganttService.zoomOut();
  }

  fitToScreen() {
    this.ganttService.fitToScreen();
  }
}
