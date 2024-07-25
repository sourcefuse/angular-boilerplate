import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {GANTT, GANTT_SCALES, GanttProviders} from './const';
import {MonthlyScaleService} from './services/timeline-scales/monthly-scale.service';
import {QuarterlyScaleService} from './services/timeline-scales/quarterly-scale.service';
import {WeeklyScaleService} from './services/timeline-scales/weekly-scale.service';
import {GanttRoutingModule} from './gantt-routing.module';
import {gantt} from 'dhtmlx-gantt';
import {CustomGanttAdapter, GanttAdapter} from './types';

import {
  GanttBarsComponent,
  GanttColumnComponent,
  GanttHeaderComponent,
  GanttTooltipComponent,
} from './components';
import {NbInputModule} from '@nebular/theme/components/input/input.module';
import {GanttZoomBarComponent} from './components/gantt-zoombar/gantt-zoombar.component';
import {GanttScrollComponent} from './components/gantt-scroll/gantt-scroll.component';
import {DateOperationService} from './services/date-operation.service';

@NgModule({
  declarations: [
    GanttBarsComponent,
    GanttColumnComponent,
    GanttHeaderComponent,
    GanttTooltipComponent,
    GanttZoomBarComponent,
    GanttScrollComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ThemeModule, GanttRoutingModule],
  exports: [
    GanttBarsComponent,
    GanttColumnComponent,
    GanttHeaderComponent,
    GanttTooltipComponent,
    GanttZoomBarComponent,
    GanttScrollComponent,
  ],
  providers: [
    DateOperationService,
    {
      provide: GANTT,
      useValue: gantt,
    },
    {
      provide: GANTT_SCALES,
      multi: true,
      useClass: MonthlyScaleService,
    },
    {
      provide: GANTT_SCALES,
      multi: true,
      useClass: WeeklyScaleService,
    },
    {
      provide: GANTT_SCALES,
      multi: true,
      useClass: QuarterlyScaleService,
    },
    {
      provide: GanttAdapter,
      useClass: CustomGanttAdapter,
    },
  ],
})
export class GanttModule {}
