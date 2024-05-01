import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {TenantListComponent} from './tenant-list/tenant-list.component';
import {NbRadioModule} from '@nebular/theme';
import {OnboardingTenantListComponent} from './onboarding-tenant-list/onboarding-tenant-list.component';
import {AgGridModule} from 'ag-grid-angular';
import {PlanItemsComponent} from './plan-items/plan-items.component';
import {BillingPlanComponent} from './billing-plan/billing-plan.component';
import {TenantFacadeService} from './tenant-list/tenant-list-facade.service';

@NgModule({
  declarations: [
    MainComponent,
    TenantListComponent,
    OnboardingTenantListComponent,
    PlanItemsComponent,
    BillingPlanComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ThemeModule,
    NbRadioModule,
    AgGridModule,
  ],
  providers: [TenantFacadeService],
})
export class MainModule {}
