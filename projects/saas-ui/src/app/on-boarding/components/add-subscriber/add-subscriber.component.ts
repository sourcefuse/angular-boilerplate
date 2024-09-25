import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {OnBoardingService} from '../../../shared/services';
import {Location} from '@angular/common';
import {keyValidator} from '@project-lib/core/validators';
import {Subscriber} from '../../../shared/models';
import {debounceTime, distinctUntilChanged} from 'rxjs';
@Component({
  selector: 'app-add-subscriber',
  templateUrl: './add-subscriber.component.html',
  styleUrls: ['./add-subscriber.component.scss'],
})
export class AddSubscriberComponent {
  marketSubsForm: FormGroup;
  [x: string]: any;

  leadId = '';

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
      contact: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      country: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      subdomain: [
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
      .get('subdomain')
      ?.valueChanges.pipe(debounceTime(1500), distinctUntilChanged())
      .subscribe(subdomain => {
        if (subdomain) {
          this.verifyKey(subdomain);
        } else {
          this.keyVerificationMessage = '';
        }
      });
  }

  verifyKey(subdomain: string) {
    this.onBoardingService.getAllTenantKeys().subscribe(
      (response: string[]) => {
        if (response.includes(subdomain)) {
          this.marketSubsForm.get('subdomain')?.setErrors({keyExists: true});
          this.keyVerificationMessage =
            'Subdomain already exists. Please choose another one.';
        } else {
          this.marketSubsForm.get('subdomain')?.setErrors(null);
          this.keyVerificationMessage = 'Subdomain is available.';
        }
      },
      error => {
        this.keyVerificationMessage = 'Error verifying subdomain';
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
        contact: userData.contact,
        companyName: userData.companyName,
        email: userData.email,
        address: userData.address,
        country: userData.country,
        zip: userData.zip,
        subdomain: userData.subdomain,
        regToken: this.regToken,
      };

      console.log(user);
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
