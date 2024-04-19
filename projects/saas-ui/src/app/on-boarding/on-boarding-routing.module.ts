import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddLeadComponent} from './add-lead/add-lead.component';
import {OnBoardingComponent} from './on-boarding.component';
import {AddTenantComponent} from './add-tenant/add-tenant.component';
import {EmailVerificationComponent} from './email-verification/email-verification.component';
import {VerificationCompleteComponent} from './verification-complete/verification-complete.component';

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
        path: 'add-lead/emailverified',
        component: EmailVerificationComponent,
      },
      {
        path: 'registration/complete',
        component: VerificationCompleteComponent,
      },
      {
        path: 'add-tenant',
        component: AddTenantComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnBoardingRoutingModule {}
