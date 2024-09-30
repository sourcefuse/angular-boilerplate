import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {OnBoardingService} from '../../../shared/services';
import {Location} from '@angular/common';
import {keyValidator} from '@project-lib/core/validators';
import {Subscriber} from '../../../shared/models';
import {debounceTime, distinctUntilChanged} from 'rxjs';
import {COUNTRIES} from '../../../shared/constants/countries.constant';
@Component({
  selector: 'app-add-subscriber',
  templateUrl: './add-subscriber.component.html',
  styleUrls: ['./add-subscriber.component.scss'],
})
export class AddSubscriberComponent {
  marketSubsForm: FormGroup;
  [x: string]: any;

  leadId = '';
  countryOptions = COUNTRIES;
  constructor(
    private route: ActivatedRoute,
    private readonly onBoardingService: OnBoardingService,
    private toastrService: NbToastrService,
    private readonly router: Router,
    private location: Location,
    private fb: FormBuilder,
    private onboardingService: OnBoardingService,
  ) {
    this.marketSubsForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      key: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z][a-zA-Z0-9]*$'),
        ],
      ],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.leadId = params['leadId'];
    });
    this.route.queryParams.subscribe(params => {
      this.regToken = params['x-amzn-marketplace-token'];
      if (!this.regToken) {
        this.toastrService.show(
          'Registration Token Missing. Please go to AWS Marketplace and follow the instructions to set up your account!',
          'Error',
          {status: 'danger'},
        );
      }
    });

    this.marketSubsForm
      .get('key')
      ?.valueChanges.pipe(debounceTime(1500), distinctUntilChanged())
      .subscribe(key => {
        const subdomainControl = this.marketSubsForm.get('key');
        if (subdomainControl && subdomainControl.valid) {
          this.verifyKey(key);
        } else {
          this.keyVerificationMessage = '';
        }
      });
  }

  verifyKey(key: string) {
    this.onBoardingService
      .getAllTenantKeys(this.marketSubsForm.get('key')?.value)
      .subscribe(
        response => {
          if (response.exists) {
            this.marketSubsForm.get('key')?.setErrors({keyExists: true});
            this.keyVerificationMessage =
              'Subdomain already exists. Please choose another one.';
            this.keyVerificationSuccess = '';
          } else {
            this.marketSubsForm.get('key')?.setErrors(null);
            this.keyVerificationSuccess = 'Subdomain is available.';
            this.keyVerificationMessage = '';
          }
        },
        error => {
          this.keyVerificationMessage = 'Error verifying subdomain';
          this.keyVerificationSuccess = '';
        },
      );
  }

  showToastr(status: string, message: string) {
    this.toastrService.show(message, 'Error', {status});
  }
  onSubmit() {
    if (this.marketSubsForm.valid) {
      if (!this.regToken) {
        this.showToastr('danger', 'Registration Token Missing!');
        return;
      }
      const userData = this.marketSubsForm.value;
      const user: Subscriber = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        companyName: userData.companyName,
        email: userData.email,
        address: userData.address,
        country: userData.country,
        zip: userData.zip,
        key: userData.key,
        regToken: this.regToken,
      };
      console.log(user);
      this.keyVerificationMessage = '';
      this.onBoardingService.addSubscriber(user).subscribe(
        () => {
          this.toastrService.show('Subscriber Added successfully');
          this.router.navigate(['/tenant/registration/complete']);
        },
        (error: string) => {
          console.error('Login error:', error); //NOSONAR
          this.toastrService.show(
            'Unable registersubscriber. Please check your input and try again.',
            'Failure',
          );
        },
      );
    }
  }
}
