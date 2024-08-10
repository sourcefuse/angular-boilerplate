import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {BillingPlanComponent} from './billing-plan.component';
import {BillingPlanService} from '../../../shared/services/billing-plan-service';
import {SubscriptionStatus} from '../../../shared/enum/subscription-status.enum';
import {Observable, of} from 'rxjs';
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

describe('BillingPlanComponent', () => {
  let component: BillingPlanComponent;
  let fixture: ComponentFixture<BillingPlanComponent>;
  let billingplanService: BillingPlanService;
  let location: Location;
  let route: ActivatedRoute;
  let router: Router;

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
        {provide: BillingPlanService, useValue: billingplanService},
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

  describe('getPaginatedBillPlans', () => {
    it('should return paginated bill plans', () => {
      const page = 1;
      const limit = 5;
      const filter = {offset: 0, limit: 5};
      const billingDetails = [
        {
          companyName: 'Company 1',
          userName: 'User 1',
          planName: 'Plan 1',
          startDate: '2021-01-01',
          endDate: '2021-12-31',
          status: SubscriptionStatus.ACTIVE,
        },
        {
          companyName: 'Company 2',
          userName: 'User 2',
          planName: 'Plan 2',
          startDate: '2021-01-01',
          endDate: '2021-12-31',
          status: SubscriptionStatus.INACTIVE,
        },
      ];
      spyOn(billingplanService, 'getBillingDetails').and.returnValue(
        of(billingDetails),
      );
      component.getPaginatedBillPlans(page, limit).subscribe(data => {
        expect(data).toEqual([
          {
            companyName: 'Company 1',
            userName: 'User 1',
            planName: 'Plan 1',
            startDate: '2021-01-01',
            endDate: '2021-12-31',
            status: 'ACTIVE',
          },
          {
            companyName: 'Company 2',
            userName: 'User 2',
            planName: 'Plan 2',
            startDate: '2021-01-01',
            endDate: '2021-12-31',
            status: 'INACTIVE',
          },
        ]);
      });
    });
  });

  describe('getTotal', () => {
    it('should return total billing plan count', () => {
      const count = {count: 10};
      spyOn(billingplanService, 'getTotalBillingPlan').and.returnValue(
        of(count),
      );
      component.getTotal().subscribe(data => {
        expect(data).toEqual(count);
      });
    });
  });
});
