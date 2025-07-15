import {Location} from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {AnyObject} from '@project-lib/core/api';
import {environment} from 'projects/saas-ui/src/environment';
import {Lead} from '../../../shared/models';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {OnBoardingService} from '../../../shared/services/on-boarding-service';
import {Stripe} from '@stripe/stripe-js';
declare let Stripe: (key: string) => Stripe;

@Component({
  selector: 'app-add-tenant',
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.scss'],
})
export class AddTenantComponent implements OnInit, AfterViewInit {
  addTenantForm: FormGroup;
  subscriptionPlans: AnyObject[];
  leadData: Lead;
  leadId = '';
  stripe: any;
  cardElement: any;

  @ViewChild('cardNumber') cardNumberElement!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private onboardingService: OnBoardingService,
    private billingPlanService: BillingPlanService,
  ) {
    this.addTenantForm = this.fb.group({
      key: [
        '',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$'),
        ],
      ],
      domains: [''],
      planId: [null, Validators.required], // Mark planId as required
      paymentMethod: ['payment_source'], // Specify Stripe as payment method
      paymentToken: ['', Validators.required], // New FormControl for Stripe token
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

  ngAfterViewInit() {
    this.stripe = Stripe(environment.stripePublicKey); // Initialize Stripe
    const elements = this.stripe.elements();

    // Initialize the card element for payment details
    this.cardElement = elements.create('card', {
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      },
    });

    this.cardElement.mount(this.cardNumberElement.nativeElement);

    // Add event listener to handle validation of Stripe element
    this.cardElement.on('change', (event: any) => {
      if (event.error) {
        this.toastrService.danger(event.error.message, 'Error');
        this.addTenantForm.get('paymentToken')?.setValue(''); // Clear paymentToken on error
      } else if (event.complete) {
        this.generateStripeToken();
      }
    });
  }

  // Generate token and set it to the form when payment details are complete
  async generateStripeToken() {
    const {token, error} = await this.stripe.createToken(this.cardElement);
    if (error) {
      this.toastrService.danger(error.message, 'Error');
    } else {
      this.addTenantForm.get('paymentToken')?.setValue(token.id); // Set token ID to form
    }
  }

  getRadioOptions() {
    this.billingPlanService.getPlanOptions().subscribe(res => {
      this.subscriptionPlans = res;
    });
  }

  async onSubmit() {
    if (this.addTenantForm.valid) {
      const domainData = this.addTenantForm.value;
      if (typeof domainData.domains === 'string') {
        domainData.domains = [domainData.domains];
      }

      this.onboardingService.addTenant(domainData, this.leadId).subscribe(
        () => this.router.navigate(['/tenant/registration/complete']),
        error => this.toastrService.danger('Registration failed', 'Error'),
      );
    }
  }

  getLeadDataById(leadId: string) {
    this.onboardingService.getLeadDetails(leadId).subscribe(
      (data: Lead) => {
        this.leadData = data;
        this.updateDomainFromEmail();
      },
      error => {
        this.toastrService.danger('Failed to fetch lead data', 'Error');
      },
    );
  }

  updateDomainFromEmail() {
    if (this.leadData && this.leadData.email) {
      const emailDomain = this.leadData.email?.substring(
        this.leadData.email.lastIndexOf('@') + 1,
      );
      if (emailDomain) {
        this.addTenantForm.get('domains').setValue(emailDomain);
      }
    }
  }
}
