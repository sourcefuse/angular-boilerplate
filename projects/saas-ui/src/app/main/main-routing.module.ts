import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {LeadListComponent} from './components/lead-list/lead-list.component';
import {OnboardingTenantListComponent} from './components/onboarding-tenant-list/onboarding-tenant-list.component';
import {ManagePlansComponent} from './components/manage-plans/manage-plans.component';
import {BillingPlanComponent} from './components/billing-plan/billing-plan.component';
import {AddPlanComponent} from './components/add-plan/add-plan.component';

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
        path: 'plans',
        component: ManagePlansComponent,
      },
      {
        path: 'billing-plan',
        component: BillingPlanComponent,
      },
      {
        path: 'add-plan',
        component: AddPlanComponent,
      },
      {
        path: 'edit-plan/:id',
        component: AddPlanComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
