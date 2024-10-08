import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {LeadListComponent} from './components/lead-list/lead-list.component';
import {
  NbBadgeModule,
  NbCardModule,
  NbRadioModule,
  NbTagModule,
} from '@nebular/theme';
import {OnboardingTenantListComponent} from './components/onboarding-tenant-list/onboarding-tenant-list.component';
import {AgGridModule} from 'ag-grid-angular';
import {TenantFacadeService} from '../shared/services/tenant-list-facade.service';
import {ManagePlansComponent} from './components/manage-plans/manage-plans.component';
import {BillingPlanComponent} from './components/billing-plan/billing-plan.component';
import {AddPlanComponent} from './components/add-plan/add-plan.component';
import {BillingPlanService} from '../shared/services/billing-plan-service';
import {ToasterService} from '@project-lib/theme/toaster';
import {ButtonRendererComponent} from './components/button-renderer/button-renderer.component';
import {TenantRegistrationComponent} from './components/tenant-registration/tenant-registration.component';
import { TenantDetailComponent } from './components/tenant-detail/tenant-detail.component';
import { EyeIconRendererComponent } from './components/eye-icon-renderer/eye-icon-renderer.component';

@NgModule({
  declarations: [
    MainComponent,
    LeadListComponent,
    OnboardingTenantListComponent,
    ManagePlansComponent,
    BillingPlanComponent,
    AddPlanComponent,
    ButtonRendererComponent,
    TenantRegistrationComponent,
    TenantDetailComponent,
    EyeIconRendererComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    ThemeModule,
    NbRadioModule,
    AgGridModule,
    NbCardModule,
    NbBadgeModule,
    NbTagModule,
  ],
  providers: [TenantFacadeService, BillingPlanService, ToasterService],
})
export class MainModule {}
