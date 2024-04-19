import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {TenantListComponent} from './tenant-list/tenant-list.component';
import {OnboardingTenantListComponent} from './onboarding-tenant-list/onboarding-tenant-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'tenant-list',
        component: TenantListComponent,
      },
      {
        path: 'onboard-tenant-list',
        component: OnboardingTenantListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
