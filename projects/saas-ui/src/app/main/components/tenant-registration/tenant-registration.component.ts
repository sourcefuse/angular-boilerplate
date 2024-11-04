import {Component} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {BillingPlanService, OnBoardingService} from '../../../shared/services';
import {AnyObject} from '@project-lib/core/api/backend-filter';
import {
  TenantLead,
  TenantLeadWithPaymentMethod,
} from '../../../shared/models/tenantLead.model';
import {keyValidator} from '@project-lib/core/validators';
import {COUNTRIES} from '../../../shared/constants/countries.constant';

export enum PaymentMethod {
  Cash = 'cash',
  Cheque = 'cheque',
  BankTransfer = 'bank_transfer',
  Other = 'other',
  Custom = 'custom',
}

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
  countryOptions = COUNTRIES;
  isSubmitting = false;

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
    this.tenantRegForm = this.fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern('^[a-zA-Z]+$')],
        ],
        name: ['', [Validators.required]], // for company name
        email: ['', [Validators.required, Validators.email]],
        address: [''],
        country: ['', [Validators.required]],
        zip: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(9)]],
        key: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$'),
          ],
        ],
        domains: [''],
        planId: [''],
        paymentMethod: ['', Validators.required],
        comment: [''],
      },
      {validators: this.emailDomainMatchValidator},
    );
  }

  paymentMethods = Object.values(PaymentMethod); // Use Object.values() to get the enum values

  emailDomainMatchValidator(group: FormGroup): {[key: string]: boolean} | null {
    const email = group.get('email').value;
    const domain = group.get('domains').value;

    if (email && domain) {
      const emailDomain = email.substring(email.lastIndexOf('@') + 1);
      if (emailDomain !== domain) {
        return {domainMismatch: true};
      }
    }
    return null;
  }

  ngOnInit() {
    this.getRadioOptions();
    this.route.params.subscribe(params => {
      this.leadId = params['leadId'];
    });
    // for automatically writing domain name from email
    this.tenantRegForm.get('email').valueChanges.subscribe(email => {
      const emailDomain = email?.substring(email.lastIndexOf('@') + 1);
      if (emailDomain) {
        this.tenantRegForm.get('domains').setValue(emailDomain);
      }
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
      this.isSubmitting = true;
      const userData = this.tenantRegForm.value;
      const user: TenantLeadWithPaymentMethod = {
        name: userData.name,
        contact: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          isPrimary: true,
        },
        address: userData.address,
        zip: userData.zip,
        country: userData.country,
        key: userData.key,
        domains: [userData.domains],
        planId: userData.planId,
        paymentMethod: userData.paymentMethod,
        comment: userData.comment, // Add the comment field here
      };
      this.onBoardingService.registerTenant(user).subscribe(
        () => {
          this.toastrService.show('Tenant Added , successfully');
          this.router.navigate(['main/onboard-tenant-list']);
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
