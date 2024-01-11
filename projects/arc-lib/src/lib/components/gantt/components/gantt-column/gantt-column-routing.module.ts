import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GanttColumnComponent} from './gantt-column.component';

const routes: Routes = [
  {
    path: '',
    component: GanttColumnComponent,
    // pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GanttColumnRoutingModule {}
