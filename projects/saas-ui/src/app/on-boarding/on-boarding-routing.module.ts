import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddLeadComponent} from './components/add-lead/add-lead.component';
import {EmailVerificationComponent} from './components/email-verification/email-verification.component';
import {OnBoardingComponent} from './on-boarding.component';
import {VerificationCompleteComponent} from './components/verification-complete/verification-complete.component';
import {AddTenantComponent} from './components/add-tenant/add-tenant.component';
import {EmailVerifyGuard} from './guards/email-verify.guard';

const routes: Routes = [
  {
    component: OnBoardingComponent,
    path: '',
    children: [
      {
        path: 'add-lead',
        component: AddLeadComponent,
      },
      {
        path: 'add-lead/emailHasBeenSent',
        component: EmailVerificationComponent,
      },
      {
        path: 'registration/complete',
        component: VerificationCompleteComponent,
      },
      {
        path: 'add-tenant/:leadId',
        component: AddTenantComponent,
        canActivate: [EmailVerifyGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnBoardingRoutingModule {}
