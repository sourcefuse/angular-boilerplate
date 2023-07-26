import {Inject, Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {catchError, concatMap, Observable, of, tap} from 'rxjs';

import {AuthService} from '../auth.service';
import {SystemStoreFacadeService} from '@project-lib/core/store';
import {APP_CONFIG} from '@project-lib/app-config';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly systemStore: SystemStoreFacadeService,
    private readonly router: Router,
    // sonarignore:start
    @Inject(APP_CONFIG) private readonly appConfig: any, // sonarignore:end
  ) {}

  canActivate(): Observable<boolean> {
    return this.systemStore
      .getEnvConfig()
      .pipe(concatMap(() => this.authService.isLoggedIn()))
      .pipe(
        tap(res => {
          if (res) {
            const timeout = setTimeout(() => {
              this.router.navigate([this.appConfig.homePath]);
              clearTimeout(timeout);
            });
          }
        }),
        catchError(() => of(true)),
      );
  }
}
