import {ApiService, DelAPICommand, IAdapter} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';
import {of, throwError} from 'rxjs';
import {DeletePlanCommand} from './delete-plan.command';

describe('DeletePlanCommand', () => {
  let deletePlanCommand: DeletePlanCommand<any>;
  let apiService: jasmine.SpyObj<ApiService>;
  let adapter: jasmine.SpyObj<IAdapter<any>>;
  let appConfig: jasmine.SpyObj<IAnyObject>;
  const planId = '123';

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ApiService>('ApiService', ['delete']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = jasmine.createSpyObj<IAnyObject>('IAnyObject', [
      'baseApiUrl',
      'subscriptionServiceUrl',
    ]);
    appConfig.baseApiUrl = 'https://api.example.com';
    appConfig.subscriptionServiceUrl = '/subscription';

    deletePlanCommand = new DeletePlanCommand(
      apiService,
      adapter,
      planId,
      appConfig,
    );
  });

  it('should create an instance of DeletePlanCommand', () => {
    expect(deletePlanCommand).toBeTruthy();
  });

  it('should handle errors from the ApiService', done => {
    const errorResponse = new Error('API error');
    apiService.delete.and.returnValue(throwError(() => errorResponse));

    deletePlanCommand.execute().subscribe({
      next: () => done.fail('Expected an error, but got success'),
      error: error => {
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });
});
