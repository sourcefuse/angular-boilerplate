import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import {AuthGuard, LoggedInGuard} from '@project-lib/core/auth';
import {GanttDemoComponent} from './components/gantt-demo/gantt-demo.component';
import {GanttZoomBarComponent} from '@project-lib/components/gantt/components/gantt-zoombar/gantt-zoombar.component';
import {GanttScrollComponent} from '@project-lib/components/gantt/components/gantt-scroll/gantt-scroll.component';
import {GanttTooltipComponent} from '@project-lib/components/gantt/components';

const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('projects/arc-lib/src/lib/components/auth/auth.module').then(
  //       m => m.AuthModule,
  //     ),
  //   canActivate: [LoggedInGuard],
  // },
  // {
  //   path: 'main',
  //   loadChildren: () => import('./main/main.module').then(m => m.MainModule),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'gantt',
  //   loadChildren: () =>
  //     import('../../../arc-lib/src/lib/components/gantt/gantt.module').then(
  //       m => m.GanttModule,
  //     ),
  //   canActivate: [AuthGuard],
  // },
  {
    path: 'gantt-demo',
    component: GanttDemoComponent,
  },

  // {
  //   path: '',
  //   redirectTo: environment.homePath,
  //   pathMatch: 'full',
  // },
  // {
  //   path: '**',
  //   redirectTo: environment.homePath,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
