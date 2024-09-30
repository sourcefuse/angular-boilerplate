import {
  AnyObject,
  ApiService,
  IAdapter,
  PostAPICommand,
} from '@project-lib/core/api';
import {Subscriber} from '../../shared/models';

import {IAnyObject} from '@project-lib/core/i-any-object';

export class AddSubscriberCommand<T> extends PostAPICommand<Subscriber> {
  constructor(
    apiService: ApiService,
    adapter: IAdapter<Subscriber>,
    appConfig: IAnyObject,
  ) {
    super(apiService, adapter, `${appConfig.subscribePath}`);
  }
}
