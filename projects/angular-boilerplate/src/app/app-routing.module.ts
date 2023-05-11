import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';
import {
  AuthGuard,
  LoggedInGuard,
} from 'projects/shared-library/src/lib/shared/core/auth';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('projects/shared-library/src/lib/auth/auth.module').then(
        (m) => m.AuthModule
      ),
    // canActivate: [LoggedInGuard],
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule),
    // canActivate: [AuthGuard],
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
