import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OnBoardingRoutingModule} from './on-boarding-routing.module';
import {AddTenantComponent} from './add-tenant/add-tenant.component';
import {AddLeadComponent} from './add-lead/add-lead.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbRadioModule} from '@nebular/theme';
import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {VerificationCompleteComponent} from './verification-complete/verification-complete.component';
import {ReactiveFormsModule} from '@angular/forms';
import {OnBoardingService} from './on-boarding-service';
import {TenantFacadeService} from '../main/tenant-list/tenant-list-facade.service';

@NgModule({
  declarations: [
    AddTenantComponent,
    AddLeadComponent,
    EmailVerificationComponent,
    VerificationCompleteComponent,
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
