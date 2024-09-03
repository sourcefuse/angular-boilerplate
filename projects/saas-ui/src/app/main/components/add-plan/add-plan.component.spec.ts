import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {
  NbCardModule,
  NbDialogService,
  NbFocusMonitor,
  NbInputModule,
  NbLayoutModule,
  NbPositionBuilderService,
  NbStatusService,
  NbThemeModule,
  NbToastrService,
} from '@nebular/theme';
import {async, of, throwError} from 'rxjs';
import {AddPlanComponent} from './add-plan.component';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {FeatureListService} from '../../../shared/services/feature-list-service';
import {OnBoardingService} from '../../../shared/services/on-boarding-service';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '../../../../../../arc-lib/src/lib/core/i-any-object';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {DOCUMENT} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {Features} from '../../../shared/models/feature.model';

// Mock services
class MockBillingPlanService {
  getCurrencyDetails() {
    return of([{id: 'USD'}]);
  }
  getBillingCycles() {
    return of([{id: 'monthly'}]);
  }
  addPlan() {
    return of({id: 'plan123'});
  }
  getPlanById() {
    return of({id: 'plan123', tier: 'Basic'});
  }
  editPlan() {
    return of({});
  }
}

class MockFeatureListService {
  getFeatures() {
    return of([{key: 'feature1', type: 'string', defaultValue: ''}]);
  }
  getFeatureById() {
    return of({features: [{key: 'feature1', value: 'test'}]});
  }
  addFeatures() {
    return of({});
  }
  editFeatures() {
    return of({});
  }
}

class MockOnBoardingService {}

const mockAppConfig: IAnyObject = {};

describe('AddPlanComponent', () => {
  let component: AddPlanComponent;
  let fixture: ComponentFixture<AddPlanComponent>;
  let activateRoute: ActivatedRoute;
  let fb: FormBuilder;
  let router: Router;
  let mockRouter;
  let mockBillingPlanService;
  let mockFeatureListService;
  let mockToastrService;
  let featureListService: FeatureListService;
  let onboardingService: OnBoardingService;
  let toasterService: NbToastrService;
  let billingplanService: BillingPlanService;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    mockBillingPlanService = jasmine.createSpyObj('BillingPlanService', [
      'addPlan',
      'editPlan',
      'getCurrencyDetails',
      'getBillingCycles',
      'getPlanById',
    ]);
    mockFeatureListService = jasmine.createSpyObj('FeatureListService', [
      'getFeatures',
      'getFeatureById',
      'addFeatures',
      'editFeatures',
    ]);
    const getCurrencydetails =
      mockBillingPlanService.getCurrencyDetails.and.returnValue(of([]));
    const getBillingCycledetails =
      mockBillingPlanService.getBillingCycles.and.returnValue(of([]));
    mockFeatureListService.getFeatures.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [AddPlanComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        NbThemeModule.forRoot(),
        ThemeModule,
        NbCardModule,
        NbInputModule,
        NbLayoutModule,
      ],
      providers: [
        {provide: APP_CONFIG, useValue: mockAppConfig},
        {provide: BillingPlanService, useValue: mockBillingPlanService},
        {provide: FeatureListService, useValue: mockFeatureListService},
        {provide: OnBoardingService, useClass: MockOnBoardingService},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlanComponent);
    component = fixture.componentInstance;
    activateRoute = TestBed.inject(ActivatedRoute);
    fb = TestBed.inject(FormBuilder);
    mockRouter = jasmine.createSpyObj(['navigate']);
    featureListService = TestBed.inject(FeatureListService);
    onboardingService = TestBed.inject(OnBoardingService);
    toasterService = TestBed.inject(NbToastrService);
    mockToastrService = jasmine.createSpyObj(['show']);
    billingplanService = TestBed.inject(
      BillingPlanService,
    ) as jasmine.SpyObj<BillingPlanService>;
    featureListService = TestBed.inject(
      FeatureListService,
    ) as jasmine.SpyObj<FeatureListService>;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getCurrencyDetails and getBillingCycleDetails', () => {
      spyOn(component, 'getCurrencyDetails');
      spyOn(component, 'getBillingCycleDetails');

      component.ngOnInit();

      expect(component.getCurrencyDetails).toHaveBeenCalled();
      expect(component.getBillingCycleDetails).toHaveBeenCalled();
    });

    it('should set isEditMode to true and call getPlanbyId if activateRoute.snapshot.params.id is truthy', () => {
      activateRoute.snapshot.params.id = '1';
      spyOn(component, 'getPlanbyId');

      component.ngOnInit();

      expect(component.isEditMode).toBeTrue();
      expect(component.getPlanbyId).toHaveBeenCalled();
    });
  });

  it('should call createFeatureControls', () => {
    spyOn(component, 'createFeatureControls');

    component.ngOnInit();

    expect(component.createFeatureControls).toHaveBeenCalled();
  });

  it('should update form controls when tier changes', () => {
    component.onTierChange('STANDARD');
    expect(component.showStorageSize).toBe(true);

    component.onTierChange('BASIC');
    expect(component.showStorageSize).toBe(false);
    expect(component.addPlanForm.get('size')?.value).toBeNull();
  });

  it('should create feature controls based on feature options', () => {
    const features = [
      {key: 'feature1', type: 'boolean'},
      {key: 'feature2', type: 'number', defaultValue: 5},
      {key: 'feature3', type: 'string'},
    ] as Features[];

    component.featureOption = features;
    component.createFeatureControls();

    const featuresGroup = component.addPlanForm.get('features') as FormGroup;

    expect(featuresGroup.contains('feature1')).toBe(true);
    expect(featuresGroup.contains('feature2')).toBe(true);
    expect(featuresGroup.contains('feature3')).toBe(true);
  });

  it('should remove feature from form controls', () => {
    const feature = {key: 'feature1', type: 'boolean'} as Features;

    component.featureOption = [feature];
    component.createFeatureControls();
    component.removeFeature(feature);

    const featuresGroup = component.addPlanForm.get('features') as FormGroup;

    expect(featuresGroup.contains('feature1')).toBe(false);
  });

  it('should add a plan when addPlan is called', () => {
    const addPlanSpy = mockBillingPlanService.addPlan.and.returnValue(
      of({id: 'planId'}),
    );
    const addFeaturesSpy = mockFeatureListService.addFeatures.and.returnValue(
      of({}),
    );

    component.addPlanForm.patchValue({
      name: 'Test Plan',
      billingCycleId: '123',
      price: '100',
      currencyId: 'USD',
      description: 'Test Plan Description',
      tier: 'BASIC',
      size: 'SMALL',
    });
    spyOn(router, 'navigate');
    spyOn(toasterService, 'show');
    component.addPlan();
    expect(addPlanSpy).toHaveBeenCalled();
    expect(addFeaturesSpy).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/plans']);
    expect(toasterService.show).toHaveBeenCalledWith('Plan added Successfully');
  });

  it('should call getPlanbyId and populate form with data', () => {
    const mockPlan = {
      name: 'Test Plan',
      billingCycleId: 'monthly',
      price: 100,
      currencyId: 'USD',
      description: 'Test description',
      tier: 'STANDARD',
      size: 'MEDIUM',
    };
    const mockFeature = {
      features: [{key: 'feature1', value: {value: 'value1'}}],
    };
    mockBillingPlanService.getPlanById.and.returnValue(of(mockPlan));
    mockFeatureListService.getFeatureById.and.returnValue(of(mockFeature));

    component.getPlanbyId();

    expect(billingplanService.getPlanById).toHaveBeenCalled();
    expect(featureListService.getFeatureById).toHaveBeenCalled();
    expect(component.addPlanForm.get('name').value).toBe(mockPlan.name);
    expect(component.addPlanForm.get('billingCycleId').value).toBe(
      mockPlan.billingCycleId,
    );
  });

  it('should call editPlan and navigate to plans on success', () => {
    const mockResponse = {id: 'plan1'};
    component.addPlanForm.patchValue({
      name: 'Test Plan',
      billingCycleId: '123',
      price: '100',
      currencyId: 'USD',
      description: 'Test Plan Description',
      tier: 'BASIC',
      size: 'SMALL',
    });
    spyOn(router, 'navigate');
    mockBillingPlanService.editPlan.and.returnValue(of(mockResponse));
    mockFeatureListService.editFeatures.and.returnValue(of({}));
    component.editPlan();
    expect(mockBillingPlanService.editPlan).toHaveBeenCalled();
    expect(mockFeatureListService.editFeatures).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/plans']);
  });

  it('should call addPlan and navigate to plans on success', () => {
    const mockResponse = {id: 'plan1'};
    mockBillingPlanService.addPlan.and.returnValue(of(mockResponse));
    mockFeatureListService.addFeatures.and.returnValue(of({}));
    spyOn(router, 'navigate');
    spyOn(toasterService, 'show');

    component.addPlan();
    expect(mockBillingPlanService.addPlan).toHaveBeenCalled();
    expect(mockFeatureListService.addFeatures).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/main/plans']);
    expect(toasterService.show).toHaveBeenCalledWith('Plan added Successfully');
  });

  it('should cancel edit and navigate to plans', () => {
    spyOn(router, 'navigate');
    component.cancelEdit();
    expect(router.navigate).toHaveBeenCalledWith(['/main/plans']);
  });
});
