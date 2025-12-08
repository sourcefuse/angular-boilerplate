import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import {
  SystemStoreFacadeService,
  UserSessionStoreService,
} from '@project-lib/core/index';
import {Observable, catchError, map, of, switchMap} from 'rxjs';
import {OnBoardingService} from '../../shared/services/on-boarding-service';

@Injectable({
  providedIn: 'root',
})
export class EmailVerifyGuard implements CanActivate {
  constructor(
    private readonly onboardingService: OnBoardingService,
    private readonly store: UserSessionStoreService,
    private readonly systemStore: SystemStoreFacadeService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    if (route.queryParamMap.keys.length > 0) {
      const code = route.queryParamMap.get('code');
      const leadId = route.params['leadId'];

      if (code) {
        return this.systemStore.getEnvConfig().pipe(
          switchMap(() => {
            return this.onboardingService.validateEmail(code, leadId).pipe(
              map(response => {
                if (response.token) {
                  this.store.saveAccessToken(response.token);
                  return true;
                }
                return false;
              }),
              catchError(err => {
                console.log(err);
                return of(false); // guards must return boolean
              }),
            );
          }),
        );
      }
    }

    return of(false);
  }
}
