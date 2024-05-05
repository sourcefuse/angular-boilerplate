import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {OnBoardingService} from '../../on-boarding/on-boarding-service';
import {catchError, of, pipe, takeUntil} from 'rxjs';
import {TenantStatus} from '../enums/tenant-status.enum';
import {AnyObject} from '@project-lib/core/api';
import {IAnyObject} from '../../../../../../../angular-boilerplate/projects/arc-lib/src/lib/core/i-any-object';
import {APP_CONFIG} from '@project-lib/app-config';
import {BillingPlanService} from '../services/billing-plan-service';
@Component({
  selector: 'add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss'],
})
export class AddPlanComponent implements OnInit {
  [x: string]: any;
  addPlanForm: FormGroup;
  currencyOptions: AnyObject;
  billingOptions: AnyObject;
  tierOptions = [
    {name: 'POOLED', value: '0'},
    {name: 'SILO', value: '1'},
  ];
  constructor(
    private fb: FormBuilder,
    private readonly onboardingService: OnBoardingService,
    private readonly toasterService: NbToastrService,
    private readonly billingplanService: BillingPlanService,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    this.addPlanForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      currencyId: ['', Validators.required],
      billingCycleId: [null, Validators.required],
      tier: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.getCurrencyDetails();
    this.getBillingCycleDetails();
  }
  onSubmit() {
    if (this.addPlanForm.valid) {
      const domainData = this.addPlanForm.value;
      domainData.price = parseFloat(domainData.price);
      domainData.tier = parseInt(domainData.tier);
      this.billingplanService.addPlan(domainData).subscribe(
        () => {
          this.toasterService.show('Plan added Successfully');
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
  getCurrencyDetails() {
    this.billingplanService.getCurrencyDetails().subscribe(response => {
      this.currencyOptions = response;
    });
  }
  getBillingCycleDetails() {
    this.billingplanService.getBillingCycles().subscribe(cycleResp => {
      this.billingOptions = cycleResp;
    });
  }
}
