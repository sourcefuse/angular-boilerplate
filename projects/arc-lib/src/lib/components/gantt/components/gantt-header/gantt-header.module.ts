import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanttHeaderRoutingModule } from './gantt-header-routing.module';
import { GanttHeaderComponent } from './gantt-header.component';
import { ThemeModule } from '@project-lib/theme/theme.module';


@NgModule({
  declarations: [GanttHeaderComponent],
  imports: [
    CommonModule,
    GanttHeaderRoutingModule,
    ThemeModule
  ],
  exports:[GanttHeaderComponent]
})
export class GanttHeaderModule { }
