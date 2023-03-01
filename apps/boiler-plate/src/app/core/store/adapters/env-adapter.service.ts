import {Injectable} from '@angular/core';
import {IAdapter} from '@boiler/core/api';
import {environment} from '@boiler/env/environment';
import {NgxLoggerLevel} from 'ngx-logger';
import {StoreModule} from '../store.module';

@Injectable({
  providedIn: StoreModule,
})
export class EnvAdapterService implements IAdapter<typeof environment> {
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
