import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {LeadListComponent} from './lead-list/lead-list.component';
import {OnboardingTenantListComponent} from './onboarding-tenant-list/onboarding-tenant-list.component';
import {ManagePlansComponent} from './manage-plans/manage-plans.component';

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
        path: 'lead-list',
        component: LeadListComponent,
      },
      {
        path: 'onboard-tenant-list',
        component: OnboardingTenantListComponent,
      },
      {
        path: 'plan-items',
        component: ManagePlansComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
