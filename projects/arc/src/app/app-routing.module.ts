import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GanttDemoComponent} from './components/gantt-demo/gantt-demo.component';
import {GanttZoomBarComponent} from '@project-lib/components/gantt/components/gantt-zoombar/gantt-zoombar.component';
import {GanttComponent} from './components/gantt.component';
import {GanttTooltipComponent} from '@project-lib/components/gantt/components';
import {TimelineComponent} from '@project-lib/components/gantt/components/timeline/timeline.component';
import {LoggedInGuard, AuthGuard} from '@project-lib/core/auth';
import {environment} from '../environments/environment';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('projects/arc-lib/src/lib/components/auth/auth.module').then(
        m => m.AuthModule,
      ),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'gantt',
    loadChildren: () =>
      import('../../../arc-lib/src/lib/components/gantt/gantt.module').then(
        m => m.GanttModule,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'gantt-demo',
    component: GanttDemoComponent,
  },
  {
    path: '',
    redirectTo: environment.homePath,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: environment.homePath,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
