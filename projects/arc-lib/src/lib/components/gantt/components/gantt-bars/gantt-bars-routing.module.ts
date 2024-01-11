import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GanttBarsComponent} from './gantt-bars.component';

const routes: Routes = [
  {
    path: '',
    component: GanttBarsComponent,
    // pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GanttBarsRoutingModule {}
