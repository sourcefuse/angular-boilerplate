import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {LeadListComponent} from './lead-list/lead-list.component';
import {NbRadioModule} from '@nebular/theme';
import {OnboardingTenantListComponent} from './onboarding-tenant-list/onboarding-tenant-list.component';
import {AgGridModule} from 'ag-grid-angular';
import {TenantFacadeService} from './lead-list/tenant-list-facade.service';
import {ManagePlansComponent} from './manage-plans/manage-plans.component';
import {BillingPlanComponent} from './billing-plan/billing-plan.component';
import {AddPlanComponent} from './add-plan/add-plan.component';
import {BillingPlanService} from './services/billing-plan-service';
import {ToasterService} from '@project-lib/theme/toaster';

@NgModule({
  declarations: [
    MainComponent,
    LeadListComponent,
    OnboardingTenantListComponent,
    ManagePlansComponent,
    BillingPlanComponent,
    AddPlanComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ThemeModule,
    NbRadioModule,
    AgGridModule,
  ],
  providers: [TenantFacadeService, BillingPlanService, ToasterService],
})
export class MainModule {}
