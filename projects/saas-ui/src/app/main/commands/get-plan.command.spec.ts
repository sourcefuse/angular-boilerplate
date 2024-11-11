import {IApiService, IAdapter} from '@project-lib/core/api';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Plan} from '../../shared/models';
import {of, throwError} from 'rxjs';
import {GetPlanCommand} from './get-plan.command';

describe('GetPlanCommand', () => {
  let getPlanCommand: GetPlanCommand<Plan[]>;
  let apiService: jasmine.SpyObj<IApiService>;
  let adapter: jasmine.SpyObj<IAdapter<Plan[]>>;
  let appConfig: IAnyObject;
  const mockPlans = [
    {
      id: 'plan1',
      name: 'Basic Plan',
      description: 'Basic plan description',
      price: 10,
      currency: 'USD',
      cycle: 'monthly',
      tier: 'basic',
    },
    {
      id: 'plan2',
      name: 'Premium Plan',
      description: 'Premium plan description',
      price: 50,
      currency: 'USD',
      cycle: 'monthly',
      tier: 'premium',
    },
  ];

  beforeEach(() => {
    apiService = jasmine.createSpyObj<IApiService>('IApiService', ['get']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = {
      baseApiUrl: 'https://api.example.com',
      subscriptionServiceUrl: '/subscription',
    };

    getPlanCommand = new GetPlanCommand(apiService, adapter, appConfig);
  });

  it('should create an instance of GetPlanCommand', () => {
    expect(getPlanCommand).toBeTruthy();
  });

  it('should handle errors from the ApiService', done => {
    const errorResponse = new Error('API error');
    apiService.get.and.returnValue(throwError(() => errorResponse));

    getPlanCommand.execute().subscribe({
      next: () => done.fail('Expected an error, but got success'),
      error: error => {
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });
});
