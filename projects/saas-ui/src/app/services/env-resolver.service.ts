import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {NGXLogger} from 'ngx-logger';
import {map, Observable, take} from 'rxjs';
import {SystemStoreFacadeService} from '@project-lib/core/store';
import {environment} from '../../environment';
import {CoreModule} from '@project-lib/core/core.module';

@Injectable({
  providedIn: CoreModule,
})
export class EnvResolverService implements Resolve<typeof environment> {
  constructor(
    private readonly systemStoreService: SystemStoreFacadeService,
    private readonly logger: NGXLogger,
  ) {}

  resolve(): Observable<typeof environment> {
    return this.systemStoreService.getSaasUIEnvConfig().pipe(
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
