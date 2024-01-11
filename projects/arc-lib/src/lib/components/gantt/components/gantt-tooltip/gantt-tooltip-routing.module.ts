import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GanttTooltipComponent} from './gantt-tooltip.component';

const routes: Routes = [
  {
    path: '',
    component: GanttTooltipComponent,
    // pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GanttTooltipRoutingModule {}
