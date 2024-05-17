import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthTokenSkipHeader} from '../../core/constants';
import {clone} from 'lodash';
import {NGXLogger} from 'ngx-logger';
import {InMemoryStorageService} from 'ngx-webstorage-service';
import {map, Observable, of} from 'rxjs';
import {GetEnvCommand} from './commands';

import {StoreKeys} from './store-keys.enum';
import {StoreModule} from './store.module';
import {ApiService} from '../api';
import {environment as mainEnv} from '@main-project/boiler/env/environment.prod';
import {environment as saasEnv} from 'projects/saas-ui/src/environment';
import {EnvAdapterService, SaasEnvAdapterService} from './adapters';

@Injectable({
  providedIn: StoreModule,
})
export class SystemStoreFacadeService {
  constructor(
    private readonly inMemoryStore: InMemoryStorageService,
    private readonly envAdapter: EnvAdapterService,
    private readonly saasEnvAdapter: SaasEnvAdapterService,
    private readonly apiService: ApiService,
    private readonly logger: NGXLogger,
  ) {}

  getEnvConfig(reset = false): Observable<typeof mainEnv> {
    const envInStore = this.inMemoryStore.get(StoreKeys.ENV_CONFIG);
    if (!reset && envInStore) {
      Object.assign(mainEnv, envInStore);
      return of(clone(mainEnv));
    } else {
      const command: GetEnvCommand<typeof mainEnv> = new GetEnvCommand(
        this.apiService,
        this.envAdapter,
      );
      command.parameters = {
        headers: new HttpHeaders().set(AuthTokenSkipHeader, ''),
      };
      return command.execute().pipe(
        map(data => {
          Object.assign(mainEnv, data);
          const clonedEnv = clone(mainEnv);
          this.inMemoryStore.set(StoreKeys.ENV_CONFIG, clonedEnv);
          this._updateLogLevel();
          return clonedEnv;
        }),
      );
    }
  }

  getSaasUIEnvConfig(reset = false): Observable<typeof saasEnv> {
    const envInStore = this.inMemoryStore.get(StoreKeys.ENV_CONFIG);
    if (!reset && envInStore) {
      Object.assign(saasEnv, envInStore);
      return of(clone(saasEnv));
    } else {
      const command: GetEnvCommand<typeof saasEnv> = new GetEnvCommand(
        this.apiService,
        this.saasEnvAdapter,
      );
      command.parameters = {
        headers: new HttpHeaders().set(AuthTokenSkipHeader, ''),
      };
      return command.execute().pipe(
        map(data => {
          Object.assign(saasEnv, data);
          const clonedEnv = clone(saasEnv);
          this.inMemoryStore.set(StoreKeys.ENV_CONFIG, clonedEnv);
          //this._updateLogLevel();
          return clonedEnv;
        }),
      );
    }
  }

  private _updateLogLevel() {
    // Get the current config
    const config = this.logger.getConfigSnapshot();
    // Updating only one field
    config.level = mainEnv.logLevel;
    // Setting the config
    this.logger.updateConfig(config);
  }
}
