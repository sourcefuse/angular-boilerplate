import {GetAPICommand, IAdapter, IApiService} from '@project-lib/core/api';
import {Lead} from '../../shared/models';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {GetLeadByIdCommand} from './get-lead-by-id.command';

describe('GetLeadByIdCommand', () => {
  let getLeadByIdCommand: GetLeadByIdCommand<any>;
  let apiServiceMock: jasmine.SpyObj<IApiService>;
  let adapterMock: jasmine.SpyObj<IAdapter<Lead>>;
  let leadId: string;
  let appConfig: IAnyObject;

  beforeEach(() => {
    apiServiceMock = jasmine.createSpyObj('IApiService', ['get']);
    adapterMock = jasmine.createSpyObj('IAdapter', ['adapt']);
    leadId = '123';
    appConfig = {
      baseApiUrl: 'http://example.com/api',
      tenantmgmtServiceUrl: '/tenantmgmt',
    };
    getLeadByIdCommand = new GetLeadByIdCommand(
      apiServiceMock,
      adapterMock,
      leadId,
      appConfig,
    );
  });

  it('should create an instance of GetLeadByIdCommand', () => {
    expect(getLeadByIdCommand).toBeTruthy();
  });
});
