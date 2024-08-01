import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {OnBoardingService} from '../../../shared/services/on-boarding-service';
import {AnyObject} from '@project-lib/core/api';
import {IAnyObject} from '../../../../../../arc-lib/src/lib/core/i-any-object';
import {APP_CONFIG} from '@project-lib/app-config';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {FeatureListService} from '../../../shared/services/feature-list-service';

interface Subtask {
  name: string;
  completed: boolean;
}

interface Task {
  name: string;
  completed: boolean;
  subtasks?: Subtask[];
}
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
  featureOptions = [
    {name: 'Video Conferencing', value: 0},
    {name: 'Chat Service', value: 1},
  ];
  storageSizes = [
    {name: 'small', value: 0},
    {name: 'medium', value: 1},
    {name: 'large', value: 2},
  ];

  task: Task = {
    name: 'Main Task',
    completed: false,
    subtasks: [
      {name: 'Subtask 1', completed: false},
      {name: 'Subtask 2', completed: false},
      {name: 'Subtask 3', completed: false},
    ],
  };

  constructor(
    private fb: FormBuilder,
    private readonly featureListService: FeatureListService,
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
      price: [''],
      currencyId: ['', Validators.required],
      billingCycleId: [null, Validators.required],
      tier: [null, Validators.required],
      feature: [null, Validators.required],
      storage: [null, Validators.required],
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
  addFeature() {
    this.featureListService.getFeatures().subscribe(res => {
      console.log(res);
    });
  }
  partiallyComplete(): boolean {
    const completedCount = this.task.subtasks!.filter(t => t.completed).length;
    return completedCount > 0 && completedCount < this.task.subtasks!.length;
  }

  updateParentCompletion() {
    const allCompleted = this.task.subtasks!.every(t => t.completed);
    const anyCompleted = this.task.subtasks!.some(t => t.completed);

    this.task.completed = allCompleted;

    return anyCompleted && !allCompleted;
  }

  update(checked: boolean, index?: number): void {
    if (index !== undefined) {
      this.task.subtasks![index].completed = checked;
    } else {
      this.task.completed = checked;
      this.task.subtasks!.forEach(t => (t.completed = checked));
    }
    this.updateParentCompletion();
  }
}
