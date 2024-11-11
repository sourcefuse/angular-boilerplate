import {ApiService, IAdapter, GetListAPICommand} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';
import {of, throwError} from 'rxjs';
import {GetTenantLeadListCommand} from './get-tenant-lead.command';

describe('GetTenantLeadListCommand', () => {
  let getTenantLeadListCommand: GetTenantLeadListCommand<any>;
  let apiService: jasmine.SpyObj<ApiService>;
  let adapter: jasmine.SpyObj<IAdapter<any>>;
  let appConfig: IAnyObject;
  const mockLeads = [
    {tenantId: 'tenant1', leadName: 'Lead 1'},
    {tenantId: 'tenant2', leadName: 'Lead 2'},
  ];

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ApiService>('ApiService', ['get']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = {
      baseApiUrl: 'https://api.example.com',
      tenantmgmtServiceUrl: '/tenantmgmt',
    };

    getTenantLeadListCommand = new GetTenantLeadListCommand(
      apiService,
      adapter,
      appConfig,
    );
  });

  it('should create an instance of GetTenantLeadListCommand', () => {
    expect(getTenantLeadListCommand).toBeTruthy();
  });

  it('should handle errors from the ApiService', done => {
    const errorResponse = new Error('API error');
    apiService.get.and.returnValue(throwError(() => errorResponse));

    getTenantLeadListCommand.execute().subscribe({
      next: () => done.fail('Expected an error, but got success'),
      error: error => {
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });
});
