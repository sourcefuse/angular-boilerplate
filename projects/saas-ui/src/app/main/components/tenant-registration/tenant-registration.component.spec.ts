import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule, FormBuilder, FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';
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
    });

    expect(component.tenantRegForm.valid).toBeTrue();
  });

  it('should mark form as invalid if email domain does not match', () => {
    component.tenantRegForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      name: 'Company',
      email: 'test@wrongdomain.com',
      address: '123 Street',
      country: 'USA',
      zip: '12345',
      key: 'tenantKey1',
      domains: 'example.com',
      planId: '1',
    });

    expect(component.tenantRegForm.valid).toBeFalse();
    expect(component.tenantRegForm.errors).toEqual({domainMismatch: true});
  });
  it('should call registerTenant on valid form submission', () => {
    component.tenantRegForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      name: 'Company',
      email: 'test@example.com',
      address: '123 Street',
      country: 'USA',
      zip: 12345,
      key: 'tenantKey1',
      domains: 'example.com',
      planId: '1',
    });

    component.onSubmit();

    expect(onBoardingService.registerTenant).toHaveBeenCalledWith({
      name: 'Company',
      contact: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test@example.com',
        isPrimary: true,
      },
      address: '123 Street',
      zip: 12345,
      country: 'USA',
      key: 'tenantKey1',
      domains: ['example.com'],
      planId: '1',
    });
    expect(toastrService.show).toHaveBeenCalledWith(
      'Tenant Added , successfully',
    );
    expect(router.navigate).toHaveBeenCalledWith(['main/onboard-tenant-list']);
  });

  it('should navigate back to the previous page', () => {
    component.backToPriviousPage();

    expect(router.navigate).toHaveBeenCalledWith(['main/onboard-tenant-list']);
  });
});
