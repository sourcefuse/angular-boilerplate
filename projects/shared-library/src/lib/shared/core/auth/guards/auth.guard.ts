import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { catchError, concatMap, Observable, of } from 'rxjs';
import { AuthService } from '../auth.service';
import {
  SystemStoreFacadeService,
  UserSessionStoreService,
} from '@main-project/core/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    private readonly store: UserSessionStoreService,
    private readonly systemStore: SystemStoreFacadeService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (route.queryParamMap.keys.length > 0) {
      const code = route.queryParamMap.get('code');
      if (code) {
        return this.systemStore
          .getEnvConfig()
          .pipe(concatMap(() => this.authService.authorize(code)))
          .pipe(concatMap(() => this._checkLogin(state.url)));
      }
    }
    return this.systemStore
      .getEnvConfig()
      .pipe(concatMap(() => this._checkLogin(state.url)));
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    if (childRoute.queryParamMap.keys.length > 0) {
      const code = childRoute.queryParamMap.get('code');
      if (code) {
        return this.systemStore
          .getEnvConfig()
          .pipe(concatMap(() => this.authService.authorize(code)))
          .pipe(concatMap(() => this._checkLogin(state.url)));
      }
    }
    return this.systemStore
      .getEnvConfig()
      .pipe(concatMap(() => this._checkLogin(state.url)));
  }

  canLoad(
    route: Route
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._checkLogin(`/${route.path}`);
  }

  private _checkLogin(url: string): Observable<boolean> {
    this.store.saveLastAccessedUrl(url);
    return this.authService.isLoggedIn().pipe(
      catchError(() => {
        this.router.navigate(['/auth/login']);
        return of(false);
      })
    );
  }
}
