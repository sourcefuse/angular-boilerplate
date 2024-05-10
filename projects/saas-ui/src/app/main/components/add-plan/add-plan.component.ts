import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {OnBoardingService} from '../../../on-boarding/on-boarding-service';
import {catchError, of, pipe, takeUntil} from 'rxjs';
import {TenantStatus} from '../../enums/tenant-status.enum';
import {AnyObject} from '@project-lib/core/api';
import {IAnyObject} from '../../../../../../arc-lib/src/lib/core/i-any-object';
import {APP_CONFIG} from '@project-lib/app-config';
import {BillingPlanService} from '../../services/billing-plan-service';
@Component({
  selector: 'add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.scss'],
})
export class AddPlanComponent implements OnInit {
  [x: string]: any;
  addPlanForm: FormGroup;
  currencyOptions: AnyObject;
  isEditMode = false;
  billingOptions: AnyObject;
  tierOptions = [
    {name: 'Pooled Compute', value: 0},
    {name: 'Silo Storage', value: 1},
  ];
  constructor(
    private fb: FormBuilder,
    private readonly onboardingService: OnBoardingService,
    private readonly toasterService: NbToastrService,
    private readonly billingplanService: BillingPlanService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,

    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    this.addPlanForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.pattern('[0-9]')],
      currencyId: ['', Validators.required],
      billingCycleId: [null, Validators.required],
      tier: [null, Validators.required],
    });
  }
  ngOnInit(): void {
    this.getCurrencyDetails();
    this.getBillingCycleDetails();
    if (this.activateRoute.snapshot.params.id) {
      this.isEditMode = true;
      this.getPlanbyId();
    }
  }
  addPlan() {
    if (this.addPlanForm.valid) {
      const domainData = this.addPlanForm.value;
      domainData.price = parseFloat(domainData.price);
      domainData.tier = parseInt(domainData.tier);
      this.billingplanService.addPlan(domainData).subscribe(
        () => {
          this.toasterService.show('Plan added Successfully');
          this.router.navigate(['/main/plans']);
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
  getPlanbyId() {
    this.billingplanService
      .getPlanById(this.activateRoute.snapshot.params.id)
      .subscribe(response => {
        const tierName = this.tierOptions[response.tier].name;
        this.addPlanForm = this.fb.group({
          name: [response.name, Validators.required],
          description: [response.description, Validators.required],
          price: [response.price, Validators.required],
          currencyId: [response.currencyId, Validators.required],
          billingCycleId: [response.billingCycleId, Validators.required],
          tier: [response.tier, Validators.required],
        });
      });
  }

  editPlan() {
    const domainData = this.addPlanForm.value;
    domainData.price = parseFloat(domainData.price);
    this.billingplanService
      .editPlan(domainData, this.activateRoute.snapshot.params.id)
      .subscribe(res => {
        this.router.navigate(['/main/plans']);
      });
  }

  mapTierValueToName(value: string): string {
    return this.tierOptions[value] || ''; // Return tier name if found, otherwise empty string
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
