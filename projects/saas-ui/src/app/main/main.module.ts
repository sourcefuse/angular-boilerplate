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

@NgModule({
  declarations: [
    MainComponent,
    LeadListComponent,
    OnboardingTenantListComponent,
    ManagePlansComponent,
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
