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
  let billingplanService: BillingPlanService;
  let location: Location;
  let route: ActivatedRoute;
  let router: Router;

  class MockBillingPlanService {
    getBillingDetails(filter: BackendFilter<Plan>): Observable<AnyObject[]> {
      return of([]);
    }
    getTotalBillingPlan(): Observable<Count> {
      return of({count: 0});
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BillingPlanComponent],
      imports: [ThemeModule, RouterTestingModule, MainModule],
      providers: [
        TenantFacadeService,
        NbStatusService,
        {provide: Location, useValue: location},
        {provide: ActivatedRoute, useValue: route},
        {provide: Router, useValue: router},
        {provide: BillingPlanService, useClass: MockBillingPlanService},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingPlanComponent);
    component = fixture.componentInstance;
    billingplanService = TestBed.inject(BillingPlanService);
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
    spyOn(billingplanService, 'getTotalBillingPlan').and.returnValue(
      of(mockCount),
    );

    component.getTotal().subscribe(count => {
      expect(count).toEqual(mockCount);
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

    spyOn(billingplanService, 'getBillingDetails').and.returnValue(
      of(mockPlans),
    );

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
    spyOn(billingplanService, 'getBillingDetails').and.returnValue(
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
