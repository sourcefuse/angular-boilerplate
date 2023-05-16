import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthTokenSkipHeader } from '../../core/constants';
import { clone } from 'lodash';
import { NGXLogger } from 'ngx-logger';
import { InMemoryStorageService } from 'ngx-webstorage-service';
import { map, Observable, of } from 'rxjs';
import { EnvAdapterService } from './adapters/env-adapter.service';
import { GetEnvCommand } from './commands';

import { StoreKeys } from './store-keys.enum';
import { StoreModule } from './store.module';
import { ApiService } from '../api';
import { environment } from '@main-project/boiler/env/environment.prod';

@Injectable({
  providedIn: StoreModule,
})
export class SystemStoreFacadeService {
  constructor(
    private readonly inMemoryStore: InMemoryStorageService,
    private readonly envAdapter: EnvAdapterService,
    private readonly apiService: ApiService,
    private readonly logger: NGXLogger
  ) {}

  getEnvConfig(reset = false): Observable<typeof environment> {
    const envInStore = this.inMemoryStore.get(StoreKeys.ENV_CONFIG);
    if (!reset && envInStore) {
      Object.assign(environment, envInStore);
      return of(clone(environment));
    } else {
      const command: GetEnvCommand<typeof environment> = new GetEnvCommand(
        this.apiService,
        this.envAdapter
      );
      command.parameters = {
        headers: new HttpHeaders().set(AuthTokenSkipHeader, ''),
      };
      return command.execute().pipe(
        map((data) => {
          Object.assign(environment, data);
          const clonedEnv = clone(environment);
          this.inMemoryStore.set(StoreKeys.ENV_CONFIG, clonedEnv);
          this._updateLogLevel();
          return clonedEnv;
        })
      );
    }
  }

  private _updateLogLevel() {
    // Get the current config
    const config = this.logger.getConfigSnapshot();
    // Updating only one field
    config.level = environment.logLevel;
    // Setting the config
    this.logger.updateConfig(config);
  }
}
