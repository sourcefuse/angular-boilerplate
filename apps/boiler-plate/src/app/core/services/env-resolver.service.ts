import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {environment} from '@boiler/env/environment';
import {NGXLogger} from 'ngx-logger';
import {map, Observable, take} from 'rxjs';
import {CoreModule} from '../core.module';
import {SystemStoreFacadeService} from '../store/system-store-facade.service';

@Injectable({
  providedIn: CoreModule,
})
export class EnvResolverService implements Resolve<typeof environment> {
  constructor(
    private readonly systemStoreService: SystemStoreFacadeService,
    private readonly logger: NGXLogger,
  ) {}

  resolve(): Observable<typeof environment> {
    return this.systemStoreService.getEnvConfig().pipe(
      take(1),
      map(data => {
        if (data) {
          return data;
        } else {
          this.logger.error('Environment config not found !');
          return environment;
        }
      }),
    );
  }
}
