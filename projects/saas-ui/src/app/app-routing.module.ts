import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, LoggedInGuard} from '@project-lib/core/auth';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('projects/saas-ui/src/app/shared /auth/auth.module').then(
        m => m.AuthModule,
      ),
    // canActivate: [LoggedInGuard],
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'tenant', // for onboading module /adding tenant
    loadChildren: () =>
      import('./on-boarding/on-boarding.module').then(m => m.OnBoardingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
