import {ApiService, IAdapter} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';
import {TenantDetails} from '../../shared/models/tenantDetails.model';
import {of, throwError} from 'rxjs';
import {GetTenantDetailsCommand} from './get-tenant-details.command';

describe('GetTenantDetailsCommand', () => {
  let getTenantDetailsCommand: GetTenantDetailsCommand<TenantDetails[]>;
  let apiService: jasmine.SpyObj<ApiService>;
  let adapter: jasmine.SpyObj<IAdapter<TenantDetails[]>>;
  let appConfig: IAnyObject;

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ApiService>('ApiService', ['get']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = {
      baseApiUrl: 'https://api.example.com',
      tenantMgmtFacadeUrl: '/tenantmgmt-facade',
    };

    getTenantDetailsCommand = new GetTenantDetailsCommand(
      apiService,
      adapter,
      appConfig,
    );
  });

  it('should create an instance of GetTenantDetailsCommand', () => {
    expect(getTenantDetailsCommand).toBeTruthy();
  });

  it('should handle errors from the ApiService', done => {
    const errorResponse = new Error('API error');
    apiService.get.and.returnValue(throwError(() => errorResponse));

    getTenantDetailsCommand.execute().subscribe({
      next: () => done.fail('Expected an error, but got success'),
      error: error => {
        expect(error).toBe(errorResponse);
        done();
      },
    });
  });
});
