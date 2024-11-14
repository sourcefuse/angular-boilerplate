import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BillingPlanService} from './billing-plan-service';
import {ApiService, AnyAdapter, Count} from '@project-lib/core/api';
import {APP_CONFIG} from '@project-lib/app-config';
import {of} from 'rxjs';
import {
  GetPlanCommand,
  GetPlanByIdCommand,
  GetBillingCycles,
  GetCurrencyDetails,
  GetBillingDetails,
  AddPlanCommand,
  EditPlanCommand,
  DeletePlanCommand,
  GetTotalPlanCommand,
  GetTotalBillingPlanCommand,
} from '../../main/commands';
import {Plan} from '../models';
import {GetPlanAdapter} from '../../on-boarding/adapters';

describe('BillingPlanService', () => {
  let service: BillingPlanService;
  let apiService: jasmine.SpyObj<ApiService>;
  let anyAdapter: jasmine.SpyObj<AnyAdapter>;
  let getPlanAdapter: jasmine.SpyObj<GetPlanAdapter>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BillingPlanService,
        {
          provide: ApiService,
          useValue: jasmine.createSpyObj('ApiService', [
            'get',
            'post',
            'patch',
            'put',
            'delete',
          ]),
        },
        {
          provide: AnyAdapter,
          useValue: jasmine.createSpyObj('AnyAdapter', [
            'adaptToModel',
            'adaptFromModel',
          ]),
        },
        {
          provide: GetPlanAdapter,
          useValue: jasmine.createSpyObj('GetPlanAdapter', ['adapt']),
        },
        {
          provide: APP_CONFIG,
          useValue: {
            baseApiUrl: 'https://api.example.com',
            tenantMgmtFacadeUrl: '/api/v1',
            subscriptionServiceUrl: '/api/v1',
          },
        },
      ],
    });

    service = TestBed.inject(BillingPlanService);
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
    anyAdapter = TestBed.inject(AnyAdapter) as jasmine.SpyObj<AnyAdapter>;
    getPlanAdapter = TestBed.inject(
      GetPlanAdapter,
    ) as jasmine.SpyObj<GetPlanAdapter>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and execute GetBillingDetails', () => {
    const mockBillingDetails = {data: 'billing details'};

    spyOn(GetBillingDetails.prototype, 'execute').and.returnValue(
      of(mockBillingDetails),
    );

    service.getBillingDetails().subscribe(result => {
      expect(result).toEqual(mockBillingDetails);
    });

    expect(GetBillingDetails.prototype.execute).toHaveBeenCalled();
  });

  it('should create and execute GetCurrencyDetails', () => {
    const mockCurrencyDetails = {data: 'currency details'};

    spyOn(GetCurrencyDetails.prototype, 'execute').and.returnValue(
      of(mockCurrencyDetails),
    );

    service.getCurrencyDetails().subscribe(result => {
      expect(result).toEqual(mockCurrencyDetails);
    });

    expect(GetCurrencyDetails.prototype.execute).toHaveBeenCalled();
  });

  it('should create and execute GetBillingCycles', () => {
    const mockBillingCycles = {data: 'billing cycles'};

    spyOn(GetBillingCycles.prototype, 'execute').and.returnValue(
      of(mockBillingCycles),
    );

    service.getBillingCycles().subscribe(result => {
      expect(result).toEqual(mockBillingCycles);
    });

    expect(GetBillingCycles.prototype.execute).toHaveBeenCalled();
  });

  it('should create and execute GetTotalBillingPlanCommand', () => {
    const mockCount: Count = {count: 10};

    spyOn(GetTotalBillingPlanCommand.prototype, 'execute').and.returnValue(
      of(mockCount),
    );

    service.getTotalBillingPlan().subscribe(result => {
      expect(result).toEqual(mockCount);
    });

    expect(GetTotalBillingPlanCommand.prototype.execute).toHaveBeenCalled();
  });

  it('should create and execute AddPlanCommand', () => {
    const mockPlan: Plan = {id: '1', name: 'New Plan'} as Plan;

    spyOn(AddPlanCommand.prototype, 'execute').and.returnValue(of(mockPlan));

    service.addPlan(mockPlan).subscribe(result => {
      expect(result).toEqual(mockPlan);
    });

    expect(AddPlanCommand.prototype.execute).toHaveBeenCalled();
  });

  it('should create and execute GetPlanByIdCommand', () => {
    const mockPlan: Plan = {id: '1', name: 'Plan 1'} as Plan;
    const planId = '1';

    spyOn(GetPlanByIdCommand.prototype, 'execute').and.returnValue(
      of(mockPlan),
    );

    service.getPlanById(planId).subscribe(result => {
      expect(result).toEqual(mockPlan);
    });

    expect(GetPlanByIdCommand.prototype.execute).toHaveBeenCalled();
  });

  it('should create and execute EditPlanCommand', () => {
    const mockPlan: Plan = {id: '1', name: 'Updated Plan'} as Plan;

    spyOn(EditPlanCommand.prototype, 'execute').and.returnValue(of(mockPlan));

    service.editPlan(mockPlan, mockPlan.id).subscribe(result => {
      expect(result).toEqual(mockPlan);
    });

    expect(EditPlanCommand.prototype.execute).toHaveBeenCalled();
  });

  it('should create and execute GetTotalPlanCommand', () => {
    const mockCount: Count = {count: 10};

    spyOn(GetTotalPlanCommand.prototype, 'execute').and.returnValue(
      of(mockCount),
    );

    service.getTotalPlan().subscribe(result => {
      expect(result).toEqual(mockCount);
    });

    expect(GetTotalPlanCommand.prototype.execute).toHaveBeenCalled();
  });
});
