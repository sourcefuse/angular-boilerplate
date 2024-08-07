import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {BillingPlanService, OnBoardingService} from '../../../shared/services';
import {AnyObject} from '@project-lib/core/api/backend-filter';
import {TenantLead} from '../../../shared/models/tenantLead.model';

@Component({
  selector: 'app-tenant-registration',
  templateUrl: './tenant-registration.component.html',
  styleUrls: ['./tenant-registration.component.scss'],
})
export class TenantRegistrationComponent {
  tenantRegForm: FormGroup;
  [x: string]: any;
  subscriptionPlans: AnyObject[];
  leadId = '';

  constructor(
    private route: ActivatedRoute,
    private readonly onBoardingService: OnBoardingService,
    private toastrService: NbToastrService,
    private readonly router: Router,
    private location: Location,
    private fb: FormBuilder,
    private onboardingService: OnBoardingService,
    private readonly billingPlanService: BillingPlanService,
  ) {
    this.tenantRegForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      name: ['', Validators.required], // for comapny name
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      key: ['', Validators.required],
      domains: ['', Validators.required],
      planId: [''],
    });
  }

  ngOnInit() {
    this.getRadioOptions();
    this.route.params.subscribe(params => {
      this.leadId = params['leadId'];
    });
  }

  getRadioOptions() {
    this.billingPlanService.getPlanOptions().subscribe(res => {
      this.subscriptionPlans = res;
    });
  }

  backToPriviousPage() {
    this.router.navigate(['main/onboard-tenant-list']);
  }
  onSubmit() {
    if (this.tenantRegForm.valid) {
      const userData = this.tenantRegForm.value;
      const user: TenantLead = {
        name: userData.name,
        contact: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          isPrimary: true,
        },
        address: userData.address,
        city: userData.city,
        state: userData.state,
        zip: userData.zip,
        country: userData.country,
        key: userData.key,
        domains: [userData.domains],
        planId: userData.planId,
      };
      this.onBoardingService.registerTenant(user).subscribe(
        () => {
          this.router.navigate(['/tenant/registration/complete']);
        },
        (error: string) => {
          console.error('Login error:', error); //NOSONAR
          this.toastrService.show(
            'Unable register tenant. Please check your input and try again.',
            'Failure',
          );
        },
      );
    }
  }
}
