import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GanttTooltipRoutingModule} from './gantt-tooltip-routing.module';
import {GanttTooltipComponent} from './gantt-tooltip.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [GanttTooltipComponent],
  imports: [CommonModule, GanttTooltipRoutingModule, TranslateModule],
  exports: [GanttTooltipComponent],
})
export class GanttTooltipModule {}
