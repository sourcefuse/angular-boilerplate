import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {BbGanttComponent} from './components';
import {GANTT_SCALES} from './const';
import {MonthlyScaleService} from './services/timeline-scales/monthly-scale.service';
import {QuarterlyScaleService} from './services/timeline-scales/quarterly-scale.service';
import {WeeklyScaleService} from './services/timeline-scales/weekly-scale.service';
import {GanttRoutingModule} from './gantt-routing.module';
import {GanttBarsModule} from './components/gantt-bars/gantt-bars.module';

@NgModule({
  declarations: [BbGanttComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ThemeModule,
    GanttRoutingModule,
    GanttBarsModule,
  ],
  exports: [BbGanttComponent],
  providers: [
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
  ],
})
export class GanttModule {}
