import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OnBoardingService} from '../../../shared/services/on-boarding-service';
import {id} from 'date-fns/locale';
import {verifyHostBindings} from '@angular/compiler';
import {COUNTRIES} from '../../../shared/constants/countries.constant';

@Component({
  selector: 'app-add-lead',
  templateUrl: './add-lead.component.html',
  styleUrls: ['./add-lead.component.scss'],
})
export class AddLeadComponent {
  addLeadForm: FormGroup;
  countryOptions = COUNTRIES;

  constructor(
    private route: ActivatedRoute,
    private readonly onBoardingService: OnBoardingService,
    private toastrService: NbToastrService,
    private readonly router: Router,
    private location: Location,
    private fb: FormBuilder,
  ) {
    this.addLeadForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      zip: ['', [Validators.pattern('^[0-9]+$'), Validators.maxLength(9)]],
      country: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
    });
  }

  onCancel() {
    this.router.navigate(['auth/login']);
  }

  onSubmit() {
    if (this.addLeadForm.valid) {
      const userData = this.addLeadForm.value;
      const user = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        companyName: userData.companyName,
        email: userData.email,
        address: {
          address: userData.address,
          zip: userData.zip,
          country: userData.country,
        },
      };
      this.onBoardingService.addLead(user).subscribe(
        () => {
          this.router.navigate(['tenant/add-lead/emailHasBeenSent']);
        },
        (error: string) => {
          console.error('Login error:', error); //NOSONAR
          this.toastrService.show(
            'Unable to add lead. Please check your input and try again.',
            'Failure',
          );
        },
      );
    }
  }
}
