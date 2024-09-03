import {ApiService, GetListAPICommand, IAdapter} from '@project-lib/core/api';
import {Lead} from '../../shared/models';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {GetLeadListCommand} from './get-lead-command';

describe('GetLeadListCommand', () => {
  let apiService: ApiService;
  let adapter: IAdapter<Lead>;
  let appConfig: IAnyObject;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['get']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = jasmine.createSpyObj('IAnyObject', [
      'baseApiUrl',
      'tenantmgmtServiceUrl',
    ]);
  });

  it('should create an instance of GetLeadListCommand', () => {
    const command = new GetLeadListCommand(apiService, adapter, appConfig);
    expect(command).toBeTruthy();
  });
});
