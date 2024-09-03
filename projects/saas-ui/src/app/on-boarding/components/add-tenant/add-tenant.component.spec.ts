import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {
  NbToastrService,
  NbThemeModule,
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbFocusMonitor,
  NbOverlayService,
  NbPositionBuilderService,
  NbOverlayContainer,
  NbLayoutDirectionService,
  NbRestoreScrollTopHelper,
  NbLayoutComponent,
  NbTagModule,
  NbRadioModule,
} from '@nebular/theme';
import {Location} from '@angular/common';
import {of, throwError} from 'rxjs';
import {AddTenantComponent} from './add-tenant.component';
import {OnBoardingService} from '../../../shared/services/on-boarding-service';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {Lead, Plan} from '../../../shared/models';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {RouterTestingModule} from '@angular/router/testing';
const mockActivatedRoute = {
  params: of({leadId: '12345'}),
};

describe('AddTenantComponent', () => {
  let component: AddTenantComponent;
  let fixture: ComponentFixture<AddTenantComponent>;
  let mockOnBoardingService: jasmine.SpyObj<OnBoardingService>;
  let mockBillingPlanService: jasmine.SpyObj<BillingPlanService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockToastrService: jasmine.SpyObj<NbToastrService>;

  beforeEach(async () => {
    const nbRestoreScrollTopHelperMock = {
      shouldRestore: jasmine
        .createSpy('shouldRestore')
        .and.returnValue(of(true)), // mock the observable
    };
    const onBoardingServiceSpy = jasmine.createSpyObj('OnBoardingService', [
      'addTenant',
      'getLeadDetails',
    ]);
    const billingPlanServiceSpy = jasmine.createSpyObj('BillingPlanService', [
      'getPlanOptions',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastrServiceSpy = jasmine.createSpyObj('NbToastrService', [
      'danger',
    ]);

    await TestBed.configureTestingModule({
      declarations: [AddTenantComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        NbThemeModule.forRoot(),
        ThemeModule,
        NbLayoutModule,
        NbCardModule,
        NbInputModule,
        NbTagModule,
        NbRadioModule,
      ],
      providers: [
        {provide: OnBoardingService, useValue: onBoardingServiceSpy},
        {provide: BillingPlanService, useValue: billingPlanServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: Location, useValue: {}},
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {
          provide: NbRestoreScrollTopHelper,
          useValue: nbRestoreScrollTopHelperMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTenantComponent);
    component = fixture.componentInstance;
    mockOnBoardingService = TestBed.inject(
      OnBoardingService,
    ) as jasmine.SpyObj<OnBoardingService>;
    mockBillingPlanService = TestBed.inject(
      BillingPlanService,
    ) as jasmine.SpyObj<BillingPlanService>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    mockToastrService = TestBed.inject(
      NbToastrService,
    ) as jasmine.SpyObj<NbToastrService>;
    mockBillingPlanService.getPlanOptions.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    const form = component.addTenantForm;
    expect(form.get('key')).toBeTruthy();
    expect(form.get('domains')).toBeTruthy();
    expect(form.get('planId')).toBeTruthy();
  });

  it('should fetch lead data if leadId is present', () => {
    const leadData: Lead = {
      email: 'test@example.com',
      firstName: 'John',
      lastName: 'Doe',
      companyName: 'Example Corp',
      isValidated: true,
      address: {
        city: 'Anytown',
        state: 'CA',
        zip: '12345',
        country: 'USA',
      },
    };

    mockOnBoardingService.getLeadDetails.and.returnValue(of(leadData));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.leadData).toEqual(leadData);
    expect(component.addTenantForm.get('domains').value).toBe('example.com');
  });

  it('should get subscription plans', () => {
    const plans: Plan[] = [
      {
        id: '1',
        name: 'Basic',
        description: 'Basic Plan',
        tier: 1,
        price: 10,
        billingCycleId: '12',
        currencyId: '123',
      },
    ];

    mockBillingPlanService.getPlanOptions.and.returnValue(of(plans));

    component.getRadioOptions();
    fixture.detectChanges();

    expect(component.subscriptionPlans).toEqual(plans);
  });
});
