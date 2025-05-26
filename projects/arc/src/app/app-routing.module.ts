import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {environment} from '../environments/environment';
import {AuthGuard, LoggedInGuard} from '@project-lib/core/auth';

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
    data: {skipLink: true},
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
