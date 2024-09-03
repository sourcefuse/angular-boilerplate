import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ButtonRendererComponent} from './button-renderer.component';
import {ToasterService} from '@project-lib/theme/toaster';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {Location} from '@angular/common';
import {
  Column,
  GridApi,
  ICellRendererParams,
  IRowNode,
  SelectionEventSourceType,
} from 'ag-grid-community';
import {MainModule} from '../../main.module';
import {
  NbThemeModule,
  NbOverlayModule,
  NbOverlayService,
  NbStatusService,
  NbToastrService,
  NbToastrModule,
} from '@nebular/theme';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {AnyAdapter, ApiService} from '@project-lib/core/api';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {APP_CONFIG} from '@project-lib/app-config';
import {GetPlanAdapter} from '../../../on-boarding/adapters';
import {RowNodeEventType} from 'ag-grid-community/dist/types/core/interfaces/iRowNode';
import {Plan} from '../../../shared/models';

describe('ButtonRendererComponent', () => {
  let component: ButtonRendererComponent;
  let mockRouter: Router;
  let mockToasterService: jasmine.SpyObj<ToasterService>;
  let mockBillingPlanService: jasmine.SpyObj<BillingPlanService>;
  let mockLocation: Location;
  let fb: FormBuilder;
  const toastrServiceSpy = jasmine.createSpyObj('NbToastrService', ['error']);
  const billingPlanServiceSpy = jasmine.createSpyObj('BillingPlanService', [
    'deletePlan',
  ]);

  beforeEach(() => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockToasterService = jasmine.createSpyObj('ToasterService', [
      'success',
      'error',
    ]);
    mockBillingPlanService = jasmine.createSpyObj('BillingPlanService', [
      'deletePlan',
    ]);
    mockLocation = jasmine.createSpyObj('Location', ['reload']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NbThemeModule,
        MainModule,
        ThemeModule,
        NbOverlayModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        NbToastrModule.forRoot(),
      ],
      providers: [
        FormBuilder,
        Location,
        AnyAdapter,
        GetPlanAdapter,
        ApiService,
        NbStatusService,
        {provide: NbToastrService, useValue: mockToasterService},
        {provide: BillingPlanService, useValue: mockBillingPlanService},
        {provide: Router, useValue: mockRouter},
        {provide: Location, useValue: mockLocation},
        {
          provide: NbOverlayService,
          useValue: {snapshot: {params: {id: '1'}}},
        },
        {provide: APP_CONFIG, useValue: {}},
        {
          provide: ToasterService,
          useValue: {snapshot: {params: {id: '1'}}},
        },
      ],
      declarations: [ButtonRendererComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(ButtonRendererComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  afterEach(() => {
    (mockBillingPlanService.deletePlan as jasmine.Spy).calls.reset(); // Reset spy after each test
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize addPlanForm with default values', () => {
    expect(component.addPlanForm.value).toEqual({
      name: '',
      description: '',
      price: '',
      currencyId: '',
      billingCycleId: null,
      tier: null,
    });
  });

  it('should initialize the params on agInit', () => {
    const params: ICellRendererParams = {
      node: {
        data: {
          id: 1,
        },
      },
    } as any;
    component.agInit(params);
    expect(component.params).toEqual(params);
  });

  it('should navigate to edit plan on editPlan', () => {
    const params: ICellRendererParams = {
      node: {
        data: {
          id: 1,
        },
      },
    } as any;
    component.agInit(params);
    component.editPlan(null);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/main/edit-plan/1']);
  });

  it('should return true on refresh method', () => {
    const params = {} as any;
    const result = component.refresh(params);
    expect(result).toBeTrue();
  });

  it('should set gridApi on onGridReady method', () => {
    const params = {api: {}} as any;
    component.onGridReady(params);
    expect(component.gridApi).toEqual(params.api);
  });
});
