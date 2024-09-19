// import {ComponentFixture, TestBed} from '@angular/core/testing';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {ActivatedRoute, Router} from '@angular/router';
// import {NbDialogService, NbToastrService} from '@nebular/theme';
// import {of, throwError} from 'rxjs'; // Import 'of' and 'throwError' from 'rxjs'
// import {OnBoardingService} from '../../../shared/services/on-boarding-service';
// import {BillingPlanService} from '../../../shared/services/billing-plan-service';
// import {FeatureListService} from '../../../shared/services/feature-list-service';
// import {AddPlanComponent} from './add-plan.component';
// import {AddFeaturesDialogComponent} from '../add-features-dialog/add-features-dialog.component';
// import {ApiService} from '@project-lib/core/api/api.service';
// import {HttpClientTestingModule} from '@angular/common/http/testing';
// import {AnyAdapter} from '@project-lib/core/api/adapters';
// import {InjectionToken} from '@angular/core';
// import {ThemeModule} from '@project-lib/theme/theme.module';

// export const APP_CONFIG = new InjectionToken('Application config');

// describe('AddPlanComponent', () => {
//   let component: AddPlanComponent;
//   let fixture: ComponentFixture<AddPlanComponent>;
//   let fb: FormBuilder;
//   let featureListService: FeatureListService;
//   let onboardingService: OnBoardingService;
//   let toasterService: NbToastrService;
//   let billingplanService: BillingPlanService;
//   let dialogService: NbDialogService;
//   let router: Router;
//   let activateRoute: ActivatedRoute;

//   const mockAppConfig = {
//     currency: 'USD',
//     billingCycles: ['Monthly', 'Yearly'],
//   };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [AddPlanComponent],
//       imports: [HttpClientTestingModule, ThemeModule],
//       providers: [
//         FormBuilder,
//         OnBoardingService,
//         NbToastrService,
//         AnyAdapter,
//         ApiService,
//         {provide: APP_CONFIG, useValue: mockAppConfig},
//         {
//           provide: BillingPlanService,
//           useValue: {
//             addPlan: jasmine.createSpy('addPlan').and.returnValue(of(null)),
//             editPlan: jasmine.createSpy('editPlan').and.returnValue(of(null)),
//             getPlanById: jasmine
//               .createSpy('getPlanById')
//               .and.returnValue(of({})),
//             getCurrencyDetails: jasmine
//               .createSpy('getCurrencyDetails')
//               .and.returnValue(of([])),
//             getBillingCycles: jasmine
//               .createSpy('getBillingCycles')
//               .and.returnValue(of([])),
//           }, // Mock BillingPlanService
//         },
//         {
//           provide: NbDialogService,
//           useValue: {
//             open: jasmine.createSpy('open').and.returnValue({onClose: of([])}),
//           }, // Mock NbDialogService
//         },
//         {
//           provide: Router,
//           useValue: {navigate: jasmine.createSpy('navigate')},
//         },
//         {
//           provide: ActivatedRoute,
//           useValue: {snapshot: {params: {id: '1'}}},
//         },
//         {
//           provide: featureListService,
//           useValue: {snapshot: {params: {id: '1'}}},
//         },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AddPlanComponent);
//     component = fixture.componentInstance;
//     fb = TestBed.inject(FormBuilder);
//     featureListService = TestBed.inject(FeatureListService);
//     onboardingService = TestBed.inject(OnBoardingService);
//     toasterService = TestBed.inject(NbToastrService);
//     billingplanService = TestBed.inject(BillingPlanService);
//     dialogService = TestBed.inject(NbDialogService);
//     router = TestBed.inject(Router);
//     activateRoute = TestBed.inject(ActivatedRoute);
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('ngOnInit', () => {
//     it('should call getCurrencyDetails and getBillingCycleDetails', () => {
//       spyOn(component, 'getCurrencyDetails');
//       spyOn(component, 'getBillingCycleDetails');

//       component.ngOnInit();

//       expect(component.getCurrencyDetails).toHaveBeenCalled();
//       expect(component.getBillingCycleDetails).toHaveBeenCalled();
//     });

//     it('should set isEditMode to true and call getPlanbyId if activateRoute.snapshot.params.id is truthy', () => {
//       activateRoute.snapshot.params.id = '1';
//       spyOn(component, 'getPlanbyId');

//       component.ngOnInit();

//       expect(component.isEditMode).toBeTrue();
//       expect(component.getPlanbyId).toHaveBeenCalled();
//     });

//     it('should call createFeatureControls', () => {
//       spyOn(component, 'createFeatureControls');

//       component.ngOnInit();

//       expect(component.createFeatureControls).toHaveBeenCalled();
//     });
//   });

//   describe('addPlan', () => {
//     beforeEach(() => {
//       component.addPlanForm = fb.group({
//         name: ['Test Plan', Validators.required],
//         billingCycleId: [1, Validators.required],
//         price: ['10.99'],
//         currencyId: ['USD', Validators.required],
//         description: ['Test Description', Validators.required],
//         tier: [0, Validators.required],
//         storage: [null],
//         features: fb.group({}),
//       });
//     });

//     it('should do nothing if addPlanForm is invalid', () => {
//       component.addPlanForm.get('name')?.setValue('');

//       component.addPlan();

//       expect(billingplanService.addPlan).not.toHaveBeenCalled();
//       expect(toasterService.show).not.toHaveBeenCalled();
//       expect(router.navigate).not.toHaveBeenCalled();
//     });
//   });

//   describe('createFeatureControls', () => {
//     it('should create a form control for each feature in featureOptions', () => {
//       component.featureOptions = [
//         {
//           name: 'Video Call',
//           description: 'Whether to allow Video Call',
//           key: 'VIDEO_CALL',
//           value_type: 'boolean',
//           default_value: true,
//         },
//         {
//           name: 'Consultant Limit',
//           description: 'Maximum number of participants',
//           key: 'MAX_PARTICIPANTS',
//           value_type: 'number',
//           default_value: null,
//         },
//       ];

//       component.createFeatureControls();

//       expect(
//         component.addPlanForm.get('features')?.get('VIDEO_CALL'),
//       ).toBeInstanceOf(FormControl);
//       expect(
//         component.addPlanForm.get('features')?.get('MAX_PARTICIPANTS'),
//       ).toBeInstanceOf(FormControl);
//     });

//     it('should set the default value of the number form control to the default_value property of the feature', () => {
//       component.featureOptions = [
//         {
//           name: 'Consultant Limit',
//           description: 'Maximum number of participants',
//           key: 'MAX_PARTICIPANTS',
//           value_type: 'number',
//           default_value: 5,
//         },
//       ];

//       component.createFeatureControls();

//       expect(
//         component.addPlanForm.get('features')?.get('MAX_PARTICIPANTS')?.value,
//       ).toBe(5);
//     });

//     it('should set the validators of the number form control to Validators.pattern(/^[0-9]+$/)', () => {
//       component.featureOptions = [
//         {
//           name: 'Consultant Limit',
//           description: 'Maximum number of participants',
//           key: 'MAX_PARTICIPANTS',
//           value_type: 'number',
//           default_value: null,
//         },
//       ];

//       component.createFeatureControls();

//       expect(
//         component.addPlanForm.get('features')?.get('MAX_PARTICIPANTS')
//           ?.validator,
//       ).toBe(Validators.pattern(/^[0-9]+$/));
//     });

//     it('should create an empty form control for value_type "boolean"', () => {
//       component.featureOptions = [
//         {
//           name: 'Video Call',
//           description: 'Whether to allow Video Call',
//           key: 'VIDEO_CALL',
//           value_type: 'boolean',
//           default_value: true,
//         },
//       ];

//       component.createFeatureControls();

//       expect(
//         component.addPlanForm.get('features')?.get('VIDEO_CALL')?.value,
//       ).toBeTrue();
//     });

//     it('should create an empty form control for value_type "string"', () => {
//       component.featureOptions = [
//         {
//           name: 'Welcome Message',
//           description: 'Message displayed to users on login',
//           key: 'WELCOME_MESSAGE',
//           value_type: 'string',
//           default_value: 'Welcome!',
//         },
//       ];

//       component.createFeatureControls();

//       expect(
//         component.addPlanForm.get('features')?.get('WELCOME_MESSAGE')?.value,
//       ).toBe('Welcome!');
//     });

//     it('should create an empty form control for value_type "object"', () => {
//       component.featureOptions = [
//         {
//           name: 'Contact Info',
//           description: 'Contact Information',
//           key: 'CONTACT_INFO',
//           value_type: 'object',
//           default_value: {email: 'test@example.com'},
//         },
//       ];

//       component.createFeatureControls();

//       expect(
//         component.addPlanForm.get('features')?.get('CONTACT_INFO')?.value,
//       ).toEqual({email: 'test@example.com'});
//     });
//   });

//   describe('showAddFeaturesPopup', () => {
//     it('should open AddFeaturesDialogComponent', () => {
//       component.showAddFeaturesPopup();

//       expect(dialogService.open).toHaveBeenCalledWith(
//         AddFeaturesDialogComponent,
//         {
//           context: {
//             selectedFeatures: component.selectedFeatures,
//             featureOptions: component.featureOptions,
//           },
//         },
//       );
//     });
//   });

//   describe('update', () => {
//     it('should update the completion status of task and subtasks if index is undefined', () => {
//       component.task = {
//         name: 'Main Task',
//         completed: false,
//         subtasks: [
//           {name: 'Subtask 1', completed: false},
//           {name: 'Subtask 2', completed: false},
//           {name: 'Subtask 3', completed: false},
//         ],
//       };

//       component.update(true);

//       expect(component.task.completed).toBeTrue();
//       expect(component.task.subtasks[0].completed).toBeTrue();
//       expect(component.task.subtasks[1].completed).toBeTrue();
//       expect(component.task.subtasks[2].completed).toBeTrue();
//     });

//     it('should call updateParentCompletion if an index is provided', () => {
//       component.task = {
//         name: 'Main Task',
//         completed: false,
//         subtasks: [
//           {name: 'Subtask 1', completed: false},
//           {name: 'Subtask 2', completed: false},
//           {name: 'Subtask 3', completed: false},
//         ],
//       };

//       spyOn(component, 'updateParentCompletion');

//       component.update(true, 1);

//       expect(component.updateParentCompletion).toHaveBeenCalled();
//     });
//   });

//   describe('savePlan', () => {
//     beforeEach(() => {
//       component.addPlanForm = fb.group({
//         name: ['Test Plan', Validators.required],
//         billingCycleId: [1, Validators.required],
//         price: ['10.99'],
//         currencyId: ['USD', Validators.required],
//         description: ['Test Description', Validators.required],
//         tier: [0, Validators.required],
//         storage: [null],
//         features: fb.group({}),
//       });
//     });

//     it('should call addPlan if isEditMode is false', () => {
//       spyOn(component, 'addPlan');
//       component.isEditMode = false;

//       component.savePlan();

//       expect(component.addPlan).toHaveBeenCalled();
//     });

//     it('should call editPlan if isEditMode is true', () => {
//       spyOn(component, 'editPlan');
//       component.isEditMode = true;

//       component.savePlan();

//       expect(component.editPlan).toHaveBeenCalled();
//     });
//   });
// });
