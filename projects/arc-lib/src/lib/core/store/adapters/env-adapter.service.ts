import {Inject, Injectable} from '@angular/core';
import {NgxLoggerLevel} from 'ngx-logger';
import {StoreModule} from '../store.module';
import {IAdapter} from '../../api';
import {APP_CONFIG} from '@project-lib/app-config';

@Injectable({
  providedIn: StoreModule,
})
/*TODO : need to change the return type cannot be empty */
export class EnvAdapterService implements IAdapter<any> {
  constructor(
    // sonarignore:start
    @Inject(APP_CONFIG) private readonly appConfig: any, // sonarignore:end
  ) {}
  adaptToModel(resp: any): typeof this.appConfig {
    resp.logLevel = !!resp.logLevel
      ? parseInt(resp.logLevel, 10)
      : NgxLoggerLevel.ERROR;
    return Object.assign({}, this.appConfig, resp);
  }

  adaptFromModel(data: Partial<any>): any {
    return data;
  }
}
