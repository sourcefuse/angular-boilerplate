import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {BillingPlanComponent} from './billing-plan.component';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {SubscriptionStatus} from '../../../shared/enum/subscription-status.enum';
import {Observable, of, throwError} from 'rxjs';
import {
  GridApi,
  GridOptions,
  IDatasource,
  IGetRowsParams,
} from 'ag-grid-community';
import {RouterTestingModule} from '@angular/router/testing';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {MainModule} from '../../main.module';
import {TenantFacadeService} from '../../../shared/services';
import {NbStatusService} from '@nebular/theme';
import {Count} from '@project-lib/core/api/models';
import {BackendFilter, AnyObject} from '@project-lib/core/api';
import {Plan} from '../../../shared/models';

describe('BillingPlanComponent', () => {
  let component: BillingPlanComponent;
  let fixture: ComponentFixture<BillingPlanComponent>;
  let mockBillingPlanService: jasmine.SpyObj<BillingPlanService>;
  let location: Location;
  let route: ActivatedRoute;
  let router: Router;

  const mockBillingData = [
    {
      companyName: 'Test Company',
      userName: 'John Doe',
      planName: 'Premium',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: SubscriptionStatus.ACTIVE,
    },
  ];

  beforeEach(async () => {
    mockBillingPlanService = jasmine.createSpyObj('BillingPlanService', [
      'getPlanOptions',
      'getTotalPlan',
      'getBillingDetails',
      'getTotalBillingPlan',
    ]);

    await TestBed.configureTestingModule({
      declarations: [BillingPlanComponent],
      imports: [ThemeModule, RouterTestingModule, MainModule],
      providers: [
        TenantFacadeService,
        NbStatusService,
        {provide: Location, useValue: location},
        {provide: ActivatedRoute, useValue: route},
        {provide: Router, useValue: router},
        {provide: BillingPlanService, useValue: mockBillingPlanService},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPlanComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize grid options correctly', () => {
    expect(component.gridOptions.pagination).toBeTrue();
    expect(component.gridOptions.rowModelType).toBe('infinite');
    expect(component.gridOptions.paginationPageSize).toBe(component.limit);
  });

  it('should call getTotal and return count', () => {
    const mockCount: Count = {count: 10};
    mockBillingPlanService.getTotalBillingPlan.and.returnValue(of(mockCount));

    component.getTotal().subscribe(count => {
      expect(count).toEqual(mockCount);
    });
  });

  it('should define correct column definitions', () => {
    expect(component.colDefs.length).toBe(6);
    expect(component.colDefs).toContain(
      jasmine.objectContaining({
        field: 'companyName',
        width: 200,
        minWidth: 20,
      }),
    );
    expect(component.colDefs).toContain(
      jasmine.objectContaining({field: 'userName', width: 200, minWidth: 20}),
    );
    expect(component.colDefs).toContain(
      jasmine.objectContaining({field: 'planName', width: 200, minWidth: 20}),
    );
    expect(component.colDefs).toContain(
      jasmine.objectContaining({field: 'startDate', width: 200, minWidth: 20}),
    );
    expect(component.colDefs).toContain(
      jasmine.objectContaining({field: 'endDate', width: 200, minWidth: 20}),
    );
    expect(component.colDefs).toContain(
      jasmine.objectContaining({field: 'status', width: 200, minWidth: 20}),
    );
  });

  it('should get paginated billing plans', done => {
    const page = 1;
    const limit = 5;

    // Make sure the spy is properly configured before the test
    mockBillingPlanService.getBillingDetails.and.returnValue(
      of(mockBillingData),
    );

    component.getPaginatedBillPlans(page, limit).subscribe({
      next: data => {
        expect(mockBillingPlanService.getBillingDetails).toHaveBeenCalledWith({
          offset: limit * (page - 1),
          limit: limit,
        });
        expect(data[0]).toEqual({
          companyName: mockBillingData[0].companyName,
          userName: mockBillingData[0].userName,
          planName: mockBillingData[0].planName,
          startDate: mockBillingData[0].startDate,
          endDate: mockBillingData[0].endDate,
          status: SubscriptionStatus[mockBillingData[0].status],
        });
        done();
      },
      error: error => {
        done.fail(error);
      },
    });
  });

  it('should call getPaginatedBillPlans and return transformed data', () => {
    const mockPlans = [
      {
        companyName: 'Company A',
        userName: 'User A',
        planName: 'Plan A',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'Active',
      },
      {
        companyName: 'Company B',
        userName: 'User B',
        planName: 'Plan B',
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        status: 'Inactive',
      },
    ];

    mockBillingPlanService.getBillingDetails.and.returnValue(of(mockPlans));

    component.getPaginatedBillPlans(1, component.limit).subscribe(data => {
      expect(data).toEqual([
        {
          companyName: 'Company A',
          userName: 'User A',
          planName: 'Plan A',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          status: SubscriptionStatus['Active'],
        },
        {
          companyName: 'Company B',
          userName: 'User B',
          planName: 'Plan B',
          startDate: '2024-01-01',
          endDate: '2024-12-31',
          status: SubscriptionStatus['Inactive'],
        },
      ]);
    });
  });
  it('should handle errors in getPaginatedBillPlans', () => {
    mockBillingPlanService.getBillingDetails.and.returnValue(
      throwError('Error'),
    );

    component.getPaginatedBillPlans(1, component.limit).subscribe(
      () => fail('expected an error, not data'),
      error => expect(error).toBe('Error'),
    );
  });

  it('should set dataSource in grid when onGridReady is called', () => {
    const mockApi = {
      setDatasource: jasmine.createSpy('setDatasource'),
    };

    component.gridApi = mockApi as unknown as GridApi;

    component.onGridReady({
      api: mockApi,
    } as any);

    expect(mockApi.setDatasource).toHaveBeenCalled();
  });
});
