import {TestBed, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular';
import {ManagePlansComponent} from './manage-plans.component';
import {ButtonRendererComponent} from '../button-renderer/button-renderer.component';
import {ToasterService} from '@project-lib/theme/toaster';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {OnBoardingService} from '../../../shared/services/on-boarding-service';
import {NbStatusService, NbToastrService} from '@nebular/theme';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {of, throwError} from 'rxjs';
import {ApiService} from '@project-lib/core/api/api.service';
import {AnyAdapter} from '@project-lib/core/api/adapters';
import {APP_CONFIG} from '@project-lib/app-config';
import {GetPlanAdapter} from '../../../on-boarding/adapters';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {GridApi} from 'ag-grid-community';
import {BackendFilter} from '@project-lib/core/api';
import {Plan} from '../../../shared/models';

describe('ManagePlansComponent', () => {
  let component: ManagePlansComponent;
  let fixture: ComponentFixture<ManagePlansComponent>;
  let billingPlanServiceMock: jasmine.SpyObj<BillingPlanService>;
  let toasterService: ToasterService;
  let onboardingService: OnBoardingService;
  let router: Router;
  let mockToasterService: jasmine.SpyObj<ToasterService>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let gridApiSpy: jasmine.SpyObj<GridApi>;
  let gridApiMock: jasmine.SpyObj<GridApi>;

  beforeEach(async () => {
    billingPlanServiceMock = jasmine.createSpyObj('BillingPlanService', [
      'getPlanOptions',
      'getTotalPlan',
    ]);
    mockToasterService = jasmine.createSpyObj('ToasterService', [
      'showSuccess',
    ]);
    mockApiService = jasmine.createSpyObj('ApiService', [
      'get',
      'post',
      'put',
      'delete',
    ]);
    gridApiMock = jasmine.createSpyObj('GridApi', [
      'setDatasource',
      'updateGridOptions',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ManagePlansComponent, ButtonRendererComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        ThemeModule,
        AgGridModule,
      ],
      providers: [
        OnBoardingService,
        ToasterService,
        NbToastrService,
        NbStatusService,
        Location,
        GetPlanAdapter,
        AnyAdapter,
        {provide: BillingPlanService, useValue: billingPlanServiceMock},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {},
            },
          },
        },
        {provide: APP_CONFIG, useValue: {}},
        {provide: ToasterService, useValue: mockToasterService},
        {provide: ApiService, useValue: mockApiService},
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePlansComponent);
    component = fixture.componentInstance;
    component.gridApi = gridApiMock;
    toasterService = TestBed.inject(ToasterService);
    onboardingService = TestBed.inject(OnBoardingService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize gridOptions on component creation', () => {
    expect(component.gridOptions).toBeTruthy();
    expect(component.gridOptions.paginationPageSize).toBe(5);
    expect(component.gridOptions.rowHeight).toBe(60);
  });

  it('should initialize grid options correctly', () => {
    expect(component.gridOptions.pagination).toBeTrue();
    expect(component.gridOptions.rowModelType).toBe('infinite');
    expect(component.gridOptions.paginationPageSize).toBe(component.limit);
    expect(component.gridOptions.cacheBlockSize).toBe(component.limit);
    expect(component.gridOptions.rowHeight).toBe(60);
    expect(component.gridOptions.defaultColDef.flex).toBe(1);
  });

  it('should set the datasource on grid ready', () => {
    const setDatasourceSpy = jasmine.createSpy('setDatasource');
    const mockApi = {setDatasource: setDatasourceSpy};
    const params = {api: mockApi} as any;

    component.onGridReady(params);

    expect(setDatasourceSpy).toHaveBeenCalled();
  });

  it('should navigate to the add-plan route', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.showManagePlan();
    expect(navigateSpy).toHaveBeenCalledWith(['/main/add-plan']);
  });

  it('should set gridApi on grid ready', () => {
    const params = {
      api: jasmine.createSpyObj<GridApi>('GridApi', ['setDatasource']),
    };
    component.onGridReady(params);
    expect(component.gridApi).toBe(params.api);
    expect(params.api.setDatasource).toHaveBeenCalled();
  });

  it('should get paginated plans', () => {
    const mockPlans = [
      {
        id: '1',
        name: 'Basic Plan',
        description: 'Basic Plan Description',
        cycleName: 'Monthly',
        currencyName: 'USD',
        billingCycleId: '123',
        currencyId: '342',
        tier: 1,
        price: 10,
      },
    ];
    billingPlanServiceMock.getPlanOptions.and.returnValue(of(mockPlans));

    component.getPaginatedPlans(1, 5).subscribe(plans => {
      expect(plans.length).toBe(1);
      expect(plans[0].name).toBe('Basic Plan');
    });

    const filter = {
      offset: 0,
      limit: 5,
      include: [{relation: 'currency'}, {relation: 'billingCycle'}],
    };
    expect(billingPlanServiceMock.getPlanOptions).toHaveBeenCalledWith(filter);
  });
});
