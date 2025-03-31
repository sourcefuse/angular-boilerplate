import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule, FormBuilder, FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {
  NbCardModule,
  NbDynamicOverlay,
  NbFocusMonitor,
  NbInputModule,
  NbLayoutDirectionService,
  NbLayoutModule,
  NbOverlayContainer,
  NbOverlayService,
  NbPositionBuilderService,
  NbStatusService,
  NbThemeModule,
  NbToastrService,
  NbTriggerStrategyBuilderService,
} from '@nebular/theme';
import {TenantRegistrationComponent} from './tenant-registration.component';
import {BillingPlanService, OnBoardingService} from '../../../shared/services';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {DOCUMENT} from '@angular/common';
import {TenantLead} from '../../../shared/models/tenantLead.model';

describe('TenantRegistrationComponent', () => {
  let component: TenantRegistrationComponent;
  let fixture: ComponentFixture<TenantRegistrationComponent>;
  let toastrService: NbToastrService;
  let onBoardingService: OnBoardingService;
  let billingPlanService: BillingPlanService;
  let router: Router;

  beforeEach(async () => {
    const toastrServiceMock = {
      show: jasmine.createSpy('show'),
    };

    const billingPlanServiceMock = {
      getPlanOptions: jasmine.createSpy('getPlanOptions').and.returnValue(
        of([
          {id: 1, name: 'Plan A'},
          {id: 2, name: 'Plan B'},
        ]),
      ),
    };

    const onBoardingServiceMock = {
      registerTenant: jasmine
        .createSpy('registerTenant')
        .and.returnValue(of({})),
    };

    const overlayServiceMock = {};

    const triggerStrategyBuilderServiceMock = {};

    class MockNbDynamicOverlay {
      create() {
        return {
          setPositionStrategy: () => ({
            pipe: () => of({}),
          }),
        };
      }
    }

    const positionBuilderServiceMock = {
      connectedTo: jasmine.createSpy('connectedTo').and.returnValue({
        position: jasmine.createSpy('position').and.returnValue({
          adjustment: jasmine.createSpy('adjustment').and.returnValue({
            offset: jasmine.createSpy('offset').and.returnValue({
              direction: jasmine.createSpy('direction').and.returnValue({}),
            }),
          }),
        }),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        NbThemeModule.forRoot(),
        ThemeModule,
        NbCardModule,
        NbInputModule,
        NbLayoutModule,
      ],
      declarations: [TenantRegistrationComponent],
      providers: [
        {provide: OnBoardingService, useValue: onBoardingServiceMock},
        {provide: BillingPlanService, useValue: billingPlanServiceMock},
        {provide: Router, useValue: {navigate: jasmine.createSpy('navigate')}},
        {provide: NbToastrService, useValue: toastrServiceMock},
        {provide: ActivatedRoute, useValue: {params: of({leadId: '123'})}},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantRegistrationComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(NbToastrService);
    onBoardingService = TestBed.inject(OnBoardingService);
    billingPlanService = TestBed.inject(BillingPlanService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and fetch radio options on init', () => {
    spyOn(component, 'getRadioOptions').and.callThrough();
    component.ngOnInit();
    expect(component.tenantRegForm).toBeDefined();
    expect(component.leadId).toBe('123');
    expect(component.getRadioOptions).toHaveBeenCalled();
  });

  it('should auto-fill the domain field based on email input', () => {
    component.ngOnInit();
    const emailControl = component.tenantRegForm.get('email');
    emailControl.setValue('test@example.com');
    expect(component.tenantRegForm.get('domains').value).toBe('example.com');
  });

  describe('Form Validation', () => {
    it('should initialize form with empty fields and required validators', () => {
      expect(component.tenantRegForm.valid).toBeFalse();
      const controls = component.tenantRegForm.controls;
      expect(controls['firstName'].hasError('required')).toBeTrue();
      expect(controls['lastName'].hasError('required')).toBeTrue();
      expect(controls['name'].hasError('required')).toBeTrue();
      expect(controls['email'].hasError('required')).toBeTrue();
      expect(controls['country'].hasError('required')).toBeTrue();
      expect(controls['paymentMethod'].hasError('required')).toBeTrue();
    });

    it('should validate email format correctly', () => {
      const email = component.tenantRegForm.controls['email'];
      email.setValue('invalid-email');
      expect(email.hasError('email')).toBeTrue();
      email.setValue('valid@example.com');
      expect(email.hasError('email')).toBeFalse();
    });

    it('should validate email domain match', () => {
      component.tenantRegForm.get('email').setValue('user@example.com');
      component.tenantRegForm.get('domains').setValue('example.org');
      expect(component.tenantRegForm.hasError('domainMismatch')).toBeTrue();
      component.tenantRegForm.get('domains').setValue('example.com');
      expect(component.tenantRegForm.hasError('domainMismatch')).toBeFalse();
    });
  });

  it('should update domain field based on email input', () => {
    const emailControl = component.tenantRegForm.get('email');
    emailControl.setValue('user@domain.com');
    fixture.detectChanges();
    expect(component.tenantRegForm.get('domains').value).toBe('domain.com');
  });

  it('should show email format error on invalid email input', () => {
    const emailControl = component.tenantRegForm.get('email');
    emailControl.setValue('invalid-email');
    expect(emailControl.hasError('email')).toBeTrue();
  });

  it('should show domain mismatch error when email domain does not match', () => {
    component.tenantRegForm.get('email').setValue('user@wrongdomain.com');
    component.tenantRegForm.get('domains').setValue('anotherdomain.com');
    expect(component.tenantRegForm.hasError('domainMismatch')).toBeTrue();
  });

  it('should call registerTenant with correct parameters on valid form submission', () => {
    component.tenantRegForm.setValue({
      firstName: 'Jane',
      lastName: 'Doe',
      name: 'Company',
      email: 'jane@example.com',
      address: '456 Street',
      country: 'USA',
      zip: '67890',
      key: 'tenantKey2',
      domains: 'example.com',
      planId: '2',
      paymentMethod: 'credit-card',
      comment: 'test-comment',
    });
    component.onSubmit();
    expect(onBoardingService.registerTenant).toHaveBeenCalledWith(
      jasmine.objectContaining({
        name: 'Company',
        contact: jasmine.objectContaining({
          firstName: 'Jane',
          lastName: 'Doe',
          email: 'jane@example.com',
          isPrimary: true, // Ensure this is a boolean, not a string
        }),
        address: '456 Street',
        zip: '67890',
        country: 'USA',
        key: 'tenantKey2',
        domains: ['example.com'],
        planId: '2',
        paymentMethod: 'credit-card',
        comment: 'test-comment',
      }),
    );
  });

  it('should navigate to tenant list on successful registration', () => {
    // Fill the form with valid data
    component.tenantRegForm.setValue({
      name: 'Company',
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      address: '456 Street',
      zip: '67890',
      country: 'USA',
      key: 'tenantKey2',
      domains: 'example.com',
      planId: '2',
      paymentMethod: 'credit-card',
      comment: 'test-comment',
    });
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['main/onboard-tenant-list']);
  });

  it('should validate form with proper values', () => {
    component.tenantRegForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      name: 'Company',
      email: 'test@example.com',
      address: '123 Street',
      country: 'USA',
      zip: '12345',
      key: 'tenantKey1',
      domains: 'example.com',
      planId: '1',
      paymentMethod: 'cash', // Add a valid payment method value
      comment: 'Test comment', // Optional, but add if it's part of the form
    });

    expect(component.tenantRegForm.valid).toBeTrue();
  });
});
