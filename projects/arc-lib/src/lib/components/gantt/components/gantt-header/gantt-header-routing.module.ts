import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GanttHeaderComponent} from './gantt-header.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: GanttHeaderComponent,
  //   // pathMatch: 'full',
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GanttHeaderRoutingModule {}
