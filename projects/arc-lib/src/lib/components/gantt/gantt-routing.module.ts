import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BbGanttComponent} from './components';

const routes: Routes = [
  {
    path: '',
    component: BbGanttComponent,
    children: [
      {
        path: 'gantt-bars',
        loadChildren: () =>
          import('./components/gantt-bars/gantt-bars.module').then(
            m => m.GanttBarsModule,
          ),
      },
      {
        path: 'gantt-columns',
        loadChildren: () =>
          import('./components/gantt-column/gantt-column.module').then(
            m => m.GanttColumnModule,
          ),
      },
      {
        path: 'gantt-header',
        loadChildren: () =>
          import('./components/gantt-header/gantt-header.module').then(
            m => m.GanttHeaderModule,
          ),
      },
      {
        path: 'gantt-tooltip',
        loadChildren: () =>
          import('./components/gantt-tooltip/gantt-tooltip.module').then(
            m => m.GanttTooltipModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GanttRoutingModule {}
