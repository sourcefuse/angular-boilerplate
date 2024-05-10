import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OnBoardingRoutingModule} from './on-boarding-routing.module';
import {AddLeadComponent} from './components/add-lead/add-lead.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbRadioModule} from '@nebular/theme';
import {EmailVerificationComponent} from './components/email-verification/email-verification.component';
import {VerificationCompleteComponent} from './components/verification-complete/verification-complete.component';
import {ReactiveFormsModule} from '@angular/forms';
import {OnBoardingService} from './on-boarding-service';
import {TenantFacadeService} from '../main/services/tenant-list-facade.service';
import {AddTenantComponent} from './components/add-tenant/add-tenant.component';

@NgModule({
  declarations: [
    AddLeadComponent,
    EmailVerificationComponent,
    VerificationCompleteComponent,
    AddTenantComponent,
  ],
  imports: [
    CommonModule,

    OnBoardingRoutingModule,
    ThemeModule,
    NbRadioModule,
    ReactiveFormsModule,
  ],
  providers: [OnBoardingService, TenantFacadeService],
})
export class OnBoardingModule {}
