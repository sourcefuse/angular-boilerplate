import {TestBed} from '@angular/core/testing';
import {ApiService, AnyAdapter} from '@project-lib/core/api';
import {APP_CONFIG} from '@project-lib/app-config';
import {of, throwError} from 'rxjs';
import {GetFeaturesCommand} from '../../main/commands/get-features.command';
import {AddFeaturesCommand} from '../../main/commands/add-features.command';
import {Features} from '../models/feature.model';
import {FeatureValues} from '../models/feature-values.model';
import {PlanWithFeatures} from '../models/plans-features.model';
import {FeatureListService} from './feature-list-service';
import {GetPlanAdapter} from '../../on-boarding/adapters';
import {
  EditFeaturesByPlanIdCommand,
  GetFeatureByPlanIdCommand,
} from '../../main/commands';

class MockApiService {
  get() {
    return of([]);
  }
  post() {
    return of([]);
  }
  patch() {
    return of([]);
  }
  put() {
    return of([]);
  }
  delete() {
    return of([]);
  }
}

class MockAnyAdapter {
  adaptToModel(data: any) {
    return data;
  }
  adaptFromModel(data: any) {
    return data;
  }
}

describe('FeatureListService', () => {
  let service: FeatureListService;
  let apiService: ApiService;
  let anyAdapter: AnyAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetPlanAdapter,
        FeatureListService,
        {provide: ApiService, useClass: MockApiService},
        {provide: AnyAdapter, useClass: MockAnyAdapter},
        {
          provide: APP_CONFIG,
          useValue: {
            baseApiUrl: 'https://api.example.com',
            tenantMgmtFacadeUrl: '/api/v1',
          },
        },
      ],
    });

    service = TestBed.inject(FeatureListService);
    apiService = TestBed.inject(ApiService);
    anyAdapter = TestBed.inject(AnyAdapter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create and execute GetFeaturesCommand', () => {
    spyOn(GetFeaturesCommand.prototype, 'execute').and.returnValue(of([]));
    service.getFeatures().subscribe();
    expect(GetFeaturesCommand.prototype.execute).toHaveBeenCalled();
  });

  it('should create and execute AddFeaturesCommand', () => {
    const featureValues: FeatureValues[] = [
      {
        featureKey: 'feature1',
        value: 'value1',
        strategyKey: 'plan',
        strategyEntityId: 'id1',
        status: false,
      },
    ];
    const planId = 'test-plan-id';
    const spy = spyOn(AddFeaturesCommand.prototype, 'execute').and.returnValue(
      of([]),
    );
    service.addFeatures(featureValues, planId).subscribe();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should create and execute EditFeaturesCommand', () => {
    const featureValues: FeatureValues[] = [
      {
        featureKey: 'feature1',
        value: 'value1',
        strategyKey: 'plan',
        strategyEntityId: 'id1',
        status: false,
      },
    ];
    const planId = 'test-plan-id';
    const spy = spyOn(
      EditFeaturesByPlanIdCommand.prototype,
      'execute',
    ).and.returnValue(of([]));
    service.editFeatures(featureValues, planId).subscribe();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should create and execute GetFeatureByIdCommand', () => {
    const planId = 'test-plan-id';
    const mockPlanWithFeatures: PlanWithFeatures = {
      name: 'Test Plan',
      tier: 'Standard',
      size: 'Medium',
      features: [],
    };
    const executeSpy = spyOn(
      GetFeatureByPlanIdCommand.prototype,
      'execute',
    ).and.returnValue(of(mockPlanWithFeatures));
    service.getFeatureById(planId).subscribe(result => {
      expect(result).toEqual(mockPlanWithFeatures);
    });
    expect(executeSpy).toHaveBeenCalled();
  });
});
