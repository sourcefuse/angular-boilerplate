import {ApiService, IAdapter, PostAPICommand} from '@project-lib/core/api';
import {Lead} from '../../shared/models';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {AddLeadCommand} from './add-lead-command';

describe('AddLeadCommand', () => {
  let addLeadCommand: AddLeadCommand<any>;
  let apiService: ApiService;
  let adapter: IAdapter<Lead>;
  let appConfig: IAnyObject;

  beforeEach(() => {
    apiService = jasmine.createSpyObj('ApiService', ['post']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = jasmine.createSpyObj('IAnyObject', [
      'baseApiUrl',
      'tenantMgmtFacadeUrl',
    ]);
    addLeadCommand = new AddLeadCommand(apiService, adapter, appConfig);
  });

  it('should create an instance of AddLeadCommand', () => {
    expect(addLeadCommand).toBeTruthy();
  });
});
