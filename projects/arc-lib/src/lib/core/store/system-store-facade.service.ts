import {HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {AuthTokenSkipHeader} from '../../core/constants';
import {clone} from 'lodash';
import {NGXLogger} from 'ngx-logger';
import {InMemoryStorageService} from 'ngx-webstorage-service';
import {map, Observable, of} from 'rxjs';
import {EnvAdapterService} from './adapters/env-adapter.service';
import {GetEnvCommand} from './commands';

import {StoreKeys} from './store-keys.enum';
import {StoreModule} from './store.module';
import {ApiService} from '../api';
import {APP_CONFIG} from '@project-lib/app-config';

@Injectable({
  providedIn: StoreModule,
})
export class SystemStoreFacadeService {
  constructor(
    private readonly inMemoryStore: InMemoryStorageService,
    private readonly envAdapter: EnvAdapterService,
    private readonly apiService: ApiService,
    private readonly logger: NGXLogger,
    // sonarignore:start
    @Inject(APP_CONFIG) private readonly appConfig: any, // sonarignore:end
  ) {}

  getEnvConfig(reset = false): Observable<any> {
    const envInStore = this.inMemoryStore.get(StoreKeys.ENV_CONFIG);
    if (!reset && envInStore) {
      Object.assign(this.appConfig, envInStore);
      return of(clone(this.appConfig));
    } else {
      const command: GetEnvCommand<any> = new GetEnvCommand(
        this.apiService,
        this.envAdapter,
      );
      command.parameters = {
        headers: new HttpHeaders().set(AuthTokenSkipHeader, ''),
      };
      return command.execute().pipe(
        map(data => {
          Object.assign(this.appConfig, data);
          const clonedEnv = clone(this.appConfig);
          this.inMemoryStore.set(StoreKeys.ENV_CONFIG, clonedEnv);
          this._updateLogLevel();
          return clonedEnv;
        }),
      );
    }
  }

  private _updateLogLevel() {
    // Get the current config
    const config = this.logger.getConfigSnapshot();
    // Updating only one field
    config.level = this.appConfig.logLevel;
    // Setting the config
    this.logger.updateConfig(config);
  }
}
