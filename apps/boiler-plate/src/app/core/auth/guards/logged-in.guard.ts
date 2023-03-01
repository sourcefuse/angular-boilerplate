import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {SystemStoreFacadeService} from '@boiler/core/store';
import {environment} from '@boiler/env/environment';
import {catchError, concatMap, Observable, of, tap} from 'rxjs';

import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly systemStore: SystemStoreFacadeService,
    private readonly router: Router,
  ) {}

  canActivate(): Observable<boolean> {
    return this.systemStore
      .getEnvConfig()
      .pipe(concatMap(() => this.authService.isLoggedIn()))
      .pipe(
        tap(res => {
          if (res) {
            const timeout = setTimeout(() => {
              this.router.navigate([environment.homePath]);
              clearTimeout(timeout);
            });
          }
        }),
        catchError(() => of(true)),
      );
  }
}
