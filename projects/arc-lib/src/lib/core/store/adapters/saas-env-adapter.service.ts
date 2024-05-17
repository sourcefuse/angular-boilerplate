import {Injectable} from '@angular/core';
import {NgxLoggerLevel} from 'ngx-logger';
import {StoreModule} from '../store.module';
import {IAdapter} from '../../api';
import {environment} from 'projects/saas-ui/src/environment';

@Injectable({
  providedIn: StoreModule,
})
export class SaasEnvAdapterService implements IAdapter<typeof environment> {
  adaptToModel(resp: any): typeof environment {
    resp.logLevel = !!resp.logLevel
      ? parseInt(resp.logLevel, 10)
      : NgxLoggerLevel.ERROR;
    return Object.assign({}, environment, resp);
  }

  adaptFromModel(data: Partial<typeof environment>): any {
    return data;
  }
}
