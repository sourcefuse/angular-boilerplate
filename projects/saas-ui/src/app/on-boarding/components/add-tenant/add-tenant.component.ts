import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { takeUntil } from 'rxjs';
import { TenantFacadeService } from '../../../shared/services/tenant-list-facade.service';
import { OnBoardingService } from '../../../shared/services/on-boarding-service';
import { Location } from '@angular/common';
import { BillingPlanService } from '../../../shared/services/billing-plan-service';
import { AnyObject } from '@project-lib/core/api';
import { keyValidator } from '@project-lib/core/validators';
import { Lead } from '../../../shared/models';

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.scss'],
})
export class AddTenantComponent implements OnInit {
  [x: string]: any;
  leadData: Lead;
  addTenantForm: FormGroup;
  subscriptionPlans: AnyObject[];
  leadId = '';
  constructor(
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private readonly router: Router,
    private location: Location,
    private fb: FormBuilder,
    private onboardingService: OnBoardingService,
    private readonly billingPlanService: BillingPlanService,
  ) {
    this.addTenantForm = this.fb.group({
      key: ['', [Validators.required, Validators.maxLength(10),
      Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$')]],
      domains: [''],
      planId: [null],
      paymentMethod: ['payment_source'], // Fixed value
      paymentDetails: this.fb.group({
        cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]], // Example: 16-digit card number
        expiryMonth: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
        expiryYear: ['', [Validators.required, Validators.min(new Date().getFullYear())]],
        cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]], // Example: 3-digit CVV
      }),
    });

  }
  ngOnInit() {
    this.getRadioOptions();
    this.route.params.subscribe(params => {
      this.leadId = params['leadId'];
      if (this.leadId) {
        this.getLeadDataById(this.leadId);
      }
    });
  }

  getRadioOptions() {
    this.billingPlanService.getPlanOptions().subscribe(res => {
      this.subscriptionPlans = res;
    });
  }
  onSubmit() {
    if (this.addTenantForm.valid) {
      const domainData = this.addTenantForm.value;
      if (typeof domainData.domains === 'string') {
        domainData.domains = [domainData.domains];
      }
      this.onboardingService
        .addTenant(domainData, this.leadId)

        .subscribe(() => {
          this.router.navigate(['/tenant/registration/complete']);
        });
    }
  }

  getLeadDataById(leadId: string) {
    this.onboardingService.getLeadDetails(leadId).subscribe(
      (data: Lead) => {
        this.leadData = data;
        this.updateDomainFromEmail();
        console.log('Lead Data:', this.leadData);
      },
      error => {
        this.toastrService.danger('Failed to fetch lead data', 'Error');
      }
    );
  }

  updateDomainFromEmail() {
    if (this.leadData && this.leadData.email) {
      const emailDomain = this.leadData.email?.substring(this.leadData.email.lastIndexOf('@') + 1);
      if (emailDomain) {
        this.addTenantForm.get('domains').setValue(emailDomain);
      }
    }
  }
}

