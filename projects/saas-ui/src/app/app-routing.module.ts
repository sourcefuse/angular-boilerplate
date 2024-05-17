import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard, LoggedInGuard} from '@project-lib/core/auth';
import {EnvResolverService} from './services';

const routes: Routes = [
  {
    path: 'auth',
    resolve: {
      env: EnvResolverService,
    },
    loadChildren: () =>
      import('projects/saas-ui/src/app/shared/auth/auth.module').then(
        m => m.AuthModule,
      ),
    canActivate: [LoggedInGuard],
  },
  {
    path: 'main',
    resolve: {
      env: EnvResolverService,
    },
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'tenant', // for onboading module /adding tenant
    resolve: {
      env: EnvResolverService,
    },
    loadChildren: () =>
      import('./on-boarding/on-boarding.module').then(m => m.OnBoardingModule),
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
