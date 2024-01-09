import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanttBarsRoutingModule } from './gantt-bars-routing.module';
import { GanttBarsComponent } from './gantt-bars.component';
import { ThemeModule } from '@project-lib/theme/theme.module';


@NgModule({
  declarations: [GanttBarsComponent],
  imports: [
    CommonModule,
    GanttBarsRoutingModule,
    ThemeModule
  ],
  exports:[GanttBarsComponent],
})
export class GanttBarsModule { }
