import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanttColumnRoutingModule } from './gantt-column-routing.module';
import { GanttColumnComponent } from './gantt-column.component';
import { ThemeModule } from '@project-lib/theme/theme.module';


@NgModule({
  declarations: [GanttColumnComponent],
  imports: [
    CommonModule,
    GanttColumnRoutingModule,
    ThemeModule
  ],
  exports:[GanttColumnComponent]
})
export class GanttColumnModule { }
