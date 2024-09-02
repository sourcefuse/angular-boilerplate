import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbDialogService, NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {OnBoardingService} from '../../../shared/services/on-boarding-service';
import {AnyObject} from '@project-lib/core/api';
import {IAnyObject} from '../../../../../../arc-lib/src/lib/core/i-any-object';
import {APP_CONFIG} from '@project-lib/app-config';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {FeatureListService} from '../../../shared/services/feature-list-service';
import {Feature} from '../../../shared/interfaces/features';
import {Features} from '../../../shared/models/feature.model';
import {Plan} from '../../../shared/models';
import {FeatureValues} from '../../../shared/models/feature-values.model';
import {PlanWithFeatures} from '../../../shared/models/plans-features.model';

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
  selectedFeatures: Features[];
  featureOption: Features[];
  featureValue: PlanWithFeatures | any;
  planId: string;
  featureId: string;
  isEditMode = false;
  billingOptions: AnyObject;
  getPlanDetail: AnyObject;
  tierOptions = [
    {name: 'Basic', value: 'BASIC'},
    {name: 'Standard', value: 'STANDARD'},
    {name: 'Premium', value: 'PREMIUM'},
  ];

  storageSizes = [
    {name: 'Small', value: 'SMALL'},
    {name: 'Medium', value: 'MEDIUM'},
    {name: 'Large', value: 'LARGE'},
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
    private readonly dialogService: NbDialogService,
    private readonly router: Router,
    private readonly activateRoute: ActivatedRoute,
    @Inject(APP_CONFIG) private readonly appConfig?: IAnyObject,
  ) {
    this.addPlanForm = this.fb.group({
      // general details
      name: ['', Validators.required],
      billingCycleId: [this.defaultBillingCycleId, Validators.required],
      price: [''],
      currencyId: [this.defaultCurrencyId, Validators.required],
      description: [''],
      tier: ['', Validators.required],
      size: [''],
      // features
      features: this.fb.group({}),
    });
  }
  ngOnInit(): void {
    this.getCurrencyDetails();
    this.getBillingCycleDetails();
    if (this.activateRoute.snapshot.params.id) {
      this.isEditMode = true;
      this.getPlanbyId();
    }
    this.getFeatures();
  }

  addPlan() {
    const domainData = this.addPlanForm.value;
    domainData.price = parseFloat(domainData.price);
    domainData.tier = String(domainData.tier);
    const featuresGroup = this.addPlanForm.get('features') as FormGroup;
    const selectedFeatures = Object.keys(featuresGroup.controls)
      .filter(
        key =>
          featuresGroup.get(key)?.value !== null &&
          featuresGroup.get(key)?.value !== '',
      )
      .reduce(
        (acc, key) => {
          const feature = this.featureOption.find(f => f.key === key);
          if (feature) {
            acc[feature.key] = featuresGroup.get(key)?.value;
          }
          return acc;
        },
        {} as {[key: string]: any},
      );
    const generalDetailsData = {
      name: domainData.name,
      billingCycleId: domainData.billingCycleId,
      price: domainData.price,
      currencyId: domainData.currencyId,
      description: domainData.description,
      tier: domainData.tier,
    };
    if (domainData.size) {
      generalDetailsData['size'] = domainData.size;
    }
    domainData.features = selectedFeatures;

    domainData.features = featuresGroup ? featuresGroup.value : {};

    this.billingplanService.addPlan(generalDetailsData).subscribe(
      resp => {
        this.planId = resp.id;
        const obj: FeatureValues[] = [];
        const planFeatureDetailData = Object.keys(selectedFeatures)
          .map(key => {
            const feature = this.featureOption.find(f => f.key === key);
            return {
              featureKey: feature ? feature.id : null,
              strategyKey: 'Plan',
              strategyEntityId: this.planId,
              status: true,
              value: selectedFeatures[key].toString(),
            };
          })
          .filter(item => item.featureKey !== null);

        this.featureListService
          .addFeatures(planFeatureDetailData, this.planId)
          .subscribe(featResp => {
            console.log('skip'); //NOSONAR
          });
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

  createFeatureControls(): void {
    const featuresGroup = this.addPlanForm.get('features') as FormGroup;
    this.featureOption.forEach(feature => {
      let control: FormControl;
      switch (feature.type) {
        case 'boolean':
          control = new FormControl(true);
          break;
        case 'number':
          control = new FormControl(
            feature.defaultValue,
            Validators.pattern(/[0-9]/),
          );
          break;
        case 'string':
          control = new FormControl();
          break;
        case 'object':
          control = new FormControl();
          break;
        default:
          control = new FormControl();
      }
      featuresGroup.addControl(feature.key, control);
    });
  }

  removeFeature(feature: Features): void {
    const featuresGroup = this.addPlanForm.get('features') as FormGroup;
    featuresGroup.removeControl(feature.key);
    const index = this.featureOption.indexOf(feature);
    if (index >= 0) {
      this.featureOption.splice(index, 1);
    }
  }

  getPlanbyId() {
    this.billingplanService
      .getPlanById(this.activateRoute.snapshot.params.id)
      .subscribe(response => {
        const tierName = response.tier;

        this.addPlanForm = this.fb.group({
          name: [response.name, Validators.required],
          description: [response.description, Validators.required],
          price: [response.price, Validators.required],
          currencyId: [response.currencyId, Validators.required],
          billingCycleId: [response.billingCycleId, Validators.required],
          tier: [tierName, Validators.required],
          size: [response.size],
          features: this.fb.group({}),
        });
      });
    this.featureListService
      .getFeatureById(this.activateRoute.snapshot.params.id)
      .subscribe(resp => {
        const features = resp.features;
        this.featureValue = resp;
        this.createFeatureControls();
        const featuresGroup = this.addPlanForm.get('features') as FormGroup;
        if (featuresGroup) {
          Object.keys(featuresGroup.controls).forEach(controlName => {
            featuresGroup
              .get(controlName)
              ?.setValue(
                features.find(item => item.key === controlName)?.value?.value,
              );
          });
        }
      });
  }

  cancelEdit() {
    this.router.navigate(['/main/plans']);
  }

  editPlan() {
    if (this.addPlanForm.valid) {
      const domainData = this.addPlanForm.value;
      domainData.price = parseFloat(domainData.price);

      const featuresGroup = this.addPlanForm.get('features') as FormGroup;
      const selectedFeatures = featuresGroup
        ? Object.keys(featuresGroup.controls)
            .filter(
              key =>
                featuresGroup.get(key)?.value !== null &&
                featuresGroup.get(key)?.value !== '',
            )
            .reduce(
              (acc, key) => {
                const feature = this.featureValue.features.find(
                  f => (f as any).key === key,
                );
                if (feature) {
                  acc[feature.id] = {
                    id: (feature.value as any).id,
                    value: featuresGroup.get(key)?.value,
                  };
                }
                return acc;
              },
              {} as {[key: string]: any},
            )
        : {};
      console.log(this.addPlanForm.value);
      const generalDetailsData = {
        name: domainData.name,
        billingCycleId: domainData.billingCycleId,
        price: domainData.price,
        currencyId: domainData.currencyId,
        description: domainData.description,
        tier: domainData.tier,
        size: domainData.size,
      };

      domainData.features = selectedFeatures;

      this.billingplanService
        .editPlan(generalDetailsData, this.activateRoute.snapshot.params.id)
        .subscribe(res => {
          this.router.navigate(['/main/plans']);
        });

      const updateFeatureDetails: FeatureValues[] = Object.keys(
        selectedFeatures,
      )
        .map(key => {
          const feature = this.featureValue.features.find(f => f.id === key);
          console.log(feature);
          return {
            id: selectedFeatures[key].id,
            featureKey: feature.id,
            strategyKey: 'Plan',
            strategyEntityId: this.activateRoute.snapshot.params.id,
            status: true,
            value: selectedFeatures[key].value?.toString(),
          };
        })
        .filter(item => item.id !== null);
      console.log(updateFeatureDetails);
      this.featureListService
        .editFeatures(
          updateFeatureDetails,
          this.activateRoute.snapshot.params.id,
        )
        .subscribe(respFeature => {
          console.log(respFeature);
        });
    } else {
      // Handle form validation errors if necessary
      console.error('Form is invalid');
    }
  }
  onTierChange(selectedTier: string): void {
    this.showStorageSize =
      selectedTier === 'STANDARD' || selectedTier === 'PREMIUM';
    if (!this.showStorageSize) {
      this.addPlanForm.get('size')?.reset();
    }
  }

  toggleFeature(feature: Features) {
    const index = this.selectedFeatures.findIndex(f => f.key === feature.key);
    if (index >= 0) {
      this.selectedFeatures.splice(index, 1);
    } else {
      this.selectedFeatures.push(feature);
    }
  }

  updateFeaturesFormControls() {
    const featuresGroup = this.addPlanForm.get('features') as FormGroup;
    if (featuresGroup) {
      this.selectedFeatures.forEach(feature => {
        featuresGroup.addControl(feature.key, this.fb.control(''));
      });
    }
  }
  mapTierValueToName(value: string): string {
    return this.tierOptions[value]?.name || '';
  }

  getCurrencyDetails() {
    this.billingplanService.getCurrencyDetails().subscribe(response => {
      this.currencyOptions = response;
      if (this.currencyOptions.length > 0) {
        this.defaultCurrencyId = this.currencyOptions[0].id;
        this.addPlanForm.get('currencyId').setValue(this.defaultCurrencyId);
      }
    });
  }
  getBillingCycleDetails() {
    this.billingplanService.getBillingCycles().subscribe(cycleResp => {
      this.billingOptions = cycleResp;
      if (this.billingOptions.length > 0) {
        this.defaultBillingCycleId = this.billingOptions[0].id;
        this.addPlanForm
          .get('billingCycleId')
          .setValue(this.defaultBillingCycleId);
      }
    });
  }
  getFeatures() {
    this.featureListService.getFeatures().subscribe(res => {
      this.featureOption = res;
      this.createFeatureControls();
    });
  }

  partiallyComplete(): boolean {
    const completedCount = this.task.subtasks!.filter(t => t.completed).length;
    return completedCount > 0 && completedCount < this.task.subtasks!.length;
  }
}
