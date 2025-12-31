import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {GANTT, GANTT_SCALES} from './const';
import {MonthlyScaleService} from './services/timeline-scales/monthly-scale.service';
import {QuarterlyScaleService} from './services/timeline-scales/quarterly-scale.service';
import {WeeklyScaleService} from './services/timeline-scales/weekly-scale.service';
import {GanttRoutingModule} from './gantt-routing.module';
import {GanttService} from './services';
import {gantt} from 'dhtmlx-gantt';
import {
  CustomGanttAdapter,
  GanttAdapter,
  GanttLib,
  GanttScaleService,
} from './types';
import {DateOperationService} from './services/date-operation.service';
import {
  GanttBarsComponent,
  GanttColumnComponent,
  GanttHeaderComponent,
  GanttTooltipComponent,
} from './components';

@NgModule({
  declarations: [
    GanttBarsComponent,
    GanttColumnComponent,
    GanttHeaderComponent,
    GanttTooltipComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ThemeModule, GanttRoutingModule],
  exports: [
    GanttBarsComponent,
    GanttColumnComponent,
    GanttHeaderComponent,
    GanttTooltipComponent,
  ],
  providers: [
    DateOperationService,
    GanttService,
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
