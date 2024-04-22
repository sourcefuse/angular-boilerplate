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
import {ButtonRendererComponent} from './button-renderer/button-renderer.component';
import {BillingPlanComponent} from './billing-plan/billing-plan.component';

@NgModule({
  declarations: [
    MainComponent,
    TenantListComponent,
    OnboardingTenantListComponent,
    PlanItemsComponent,
    ButtonRendererComponent,
    BillingPlanComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ThemeModule,
    NbRadioModule,
    AgGridModule,
  ],
})
export class MainModule {}
