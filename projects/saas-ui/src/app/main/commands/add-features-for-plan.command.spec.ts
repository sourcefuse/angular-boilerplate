import {ApiService, IAdapter} from '@project-lib/core/api';

import {IAnyObject} from '@project-lib/core/i-any-object';
import {Feature} from '../../shared/interfaces/features';
import {of, throwError} from 'rxjs';
import {AddFeaturesForPlanCommand} from './add-features-for-plan.command';

describe('AddFeaturesForPlanCommand', () => {
  let addFeaturesForPlanCommand: AddFeaturesForPlanCommand<Feature[]>;
  let apiService: jasmine.SpyObj<ApiService>;
  let adapter: jasmine.SpyObj<IAdapter<Feature[]>>;
  let appConfig: IAnyObject;
  const planId = 'plan123';

  beforeEach(() => {
    apiService = jasmine.createSpyObj<ApiService>('ApiService', ['post']);
    adapter = jasmine.createSpyObj('IAdapter', ['adapt']);
    appConfig = {
      baseApiUrl: 'https://api.example.com',
      subscriptionServiceUrl: '/subscription',
    };

    addFeaturesForPlanCommand = new AddFeaturesForPlanCommand(
      apiService,
      adapter,
      planId,
      appConfig,
    );
  });

  it('should create an instance of AddFeaturesForPlanCommand', () => {
    expect(addFeaturesForPlanCommand).toBeTruthy();
  });
});
