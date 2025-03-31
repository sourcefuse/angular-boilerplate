import {ApiService, IAdapter, GetAPICommand} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';
import {of, throwError} from 'rxjs';
import {GetTotalLeadCommand} from './get-total-lead.command';

describe('GetTotalLeadCommand', () => {
  let getTotalLeadCommand: GetTotalLeadCommand<any>;
  let apiService: jasmine.SpyObj<ApiService>;
  let adapter: jasmine.SpyObj<IAdapter<any>>;
  let appConfig: IAnyObject;
  const mockCountResponse = {count: 5};

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ApiService>('ApiService', ['get']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = {
      baseApiUrl: 'https://api.example.com',
      tenantmgmtServiceUrl: '/tenantmgmt',
    };

    getTotalLeadCommand = new GetTotalLeadCommand(
      apiService,
      adapter,
      appConfig,
    );
  });

  it('should create an instance of GetTotalLeadCommand', () => {
    expect(getTotalLeadCommand).toBeTruthy();
  });

  it('should handle errors from the ApiService', done => {
    const errorResponse = new Error('API error');
    apiService.get.and.returnValue(throwError(() => errorResponse));

    getTotalLeadCommand.execute().subscribe({
      next: () => done.fail('Expected an error, but got success'),
      error: error => {
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });
});
