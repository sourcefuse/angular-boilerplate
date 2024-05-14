import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import {UserSessionStoreService} from '@project-lib/core/index';
import {Observable, catchError, map, of, tap} from 'rxjs';
import {OnBoardingService} from '../../shared/services/on-boarding-service';

@Injectable({
  providedIn: 'root',
})
export class EmailVerifyGuard implements CanActivate {
  constructor(
    private readonly onboardingService: OnBoardingService,
    private readonly store: UserSessionStoreService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    if (route.queryParamMap.keys.length > 0) {
      const code = route.queryParamMap.get('code');
      const leadId = route.params['leadId'];

      if (code) {
        return this.onboardingService.validateEmail(code, leadId).pipe(
          map(response => {
            if (response.token) {
              this.store.saveAccessToken(response.token);
              return true;
            } else return false;
          }),
          catchError(err => {
            console.log(err);
            throw err;
          }),
        );
      }
    }

    return of(false);
  }
}
