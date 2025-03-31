import {TestBed} from '@angular/core/testing';
import {IApiService, IAdapter} from '@project-lib/core/api';
import {Plan} from '../../shared/models';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {Observable, of} from 'rxjs';
import {GetPlanCommand} from './get-plan.command';

// Mock implementations
class MockApiService implements IApiService {
  get(url: string, params?: any): Observable<any> {
    return of([]); // Mock data for GET requests
  }

  post(url: string, body: any, params?: any): Observable<any> {
    return of({}); // Mock data for POST requests
  }

  patch(url: string, body: any, params?: any): Observable<any> {
    return of({}); // Mock data for PATCH requests
  }

  put(url: string, body: any, params?: any): Observable<any> {
    return of({}); // Mock data for PUT requests
  }

  delete(url: string, params?: any): Observable<any> {
    return of({}); // Mock data for DELETE requests
  }
}

class MockAdapter implements IAdapter<Plan[], Plan[]> {
  adaptToModel(data: Plan[]): Plan[] {
    return data;
  }

  adaptFromModel(data: Plan[]): Plan[] {
    return data;
  }
}

const mockAppConfig: IAnyObject = {
  baseApiUrl: 'https://api.example.com',
  subscriptionServiceUrl: '/v1/subscriptions',
};

describe('GetPlanCommand', () => {
  let apiService: IApiService;
  let adapter: IAdapter<Plan[], Plan[]>;
  let command: GetPlanCommand<Plan[]>;

  beforeEach(() => {
    apiService = new MockApiService();
    adapter = new MockAdapter();
    command = new GetPlanCommand(apiService, adapter, mockAppConfig);
  });

  it('should create an instance of GetPlanCommand', () => {
    expect(command).toBeTruthy();
  });
});
