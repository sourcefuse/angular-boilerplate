import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {LeadListComponent} from './components/lead-list/lead-list.component';
import {NbRadioModule} from '@nebular/theme';
import {OnboardingTenantListComponent} from './components/onboarding-tenant-list/onboarding-tenant-list.component';
import {AgGridModule} from 'ag-grid-angular';
import {TenantFacadeService} from './services/tenant-list-facade.service';
import {ManagePlansComponent} from './components/manage-plans/manage-plans.component';
import {BillingPlanComponent} from './components/billing-plan/billing-plan.component';
import {AddPlanComponent} from './components/add-plan/add-plan.component';
import {BillingPlanService} from './services/billing-plan-service';
import {ToasterService} from '@project-lib/theme/toaster';
import {ButtonRendererComponent} from './components/button-renderer/button-renderer.component';

@NgModule({
  declarations: [
    MainComponent,
    LeadListComponent,
    OnboardingTenantListComponent,
    ManagePlansComponent,
    BillingPlanComponent,
    AddPlanComponent,
    ButtonRendererComponent,
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
