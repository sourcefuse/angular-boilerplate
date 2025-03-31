import {TestBed} from '@angular/core/testing';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {of, throwError} from 'rxjs';
import {EmailVerifyGuard} from './email-verify.guard';
import {OnBoardingService} from '../../shared/services/on-boarding-service';
import {UserSessionStoreService} from '@project-lib/core/index';

describe('EmailVerifyGuard', () => {
  let guard: EmailVerifyGuard;
  let onboardingService: jasmine.SpyObj<OnBoardingService>;
  let store: jasmine.SpyObj<UserSessionStoreService>;

  beforeEach(() => {
    const onboardingServiceSpy = jasmine.createSpyObj('OnBoardingService', [
      'validateEmail',
    ]);
    const storeSpy = jasmine.createSpyObj('UserSessionStoreService', [
      'saveAccessToken',
    ]);

    TestBed.configureTestingModule({
      providers: [
        EmailVerifyGuard,
        {provide: OnBoardingService, useValue: onboardingServiceSpy},
        {provide: UserSessionStoreService, useValue: storeSpy},
      ],
    });

    guard = TestBed.inject(EmailVerifyGuard);
    onboardingService = TestBed.inject(
      OnBoardingService,
    ) as jasmine.SpyObj<OnBoardingService>;
    store = TestBed.inject(
      UserSessionStoreService,
    ) as jasmine.SpyObj<UserSessionStoreService>;
  });

  const createRoute = (
    queryParams: any,
    params: any,
  ): ActivatedRouteSnapshot => {
    return {
      queryParamMap: {
        keys: Object.keys(queryParams),
        get: (key: string) => queryParams[key],
      },
      params: params,
    } as ActivatedRouteSnapshot;
  };

  // Mock RouterStateSnapshot
  const routerState: RouterStateSnapshot = {} as RouterStateSnapshot;

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should activate when code is provided and token is returned', done => {
    const route = createRoute({code: 'test-code'}, {leadId: '123'});
    const response = {token: 'valid-token', leadId: '123'}; // Include leadId in the response
    onboardingService.validateEmail.and.returnValue(of(response));

    guard.canActivate(route, routerState).subscribe(result => {
      expect(result).toBeTrue();
      expect(store.saveAccessToken).toHaveBeenCalledWith('valid-token');
      done();
    });
  });

  it('should not activate when code is provided but no token is returned', done => {
    const route = createRoute({code: 'test-code'}, {leadId: '123'});
    const response = {token: '', leadId: '123'}; // Provide leadId but empty token
    onboardingService.validateEmail.and.returnValue(of(response));

    guard.canActivate(route, routerState).subscribe(result => {
      expect(result).toBeFalse();
      expect(store.saveAccessToken).not.toHaveBeenCalled();
      done();
    });
  });

  it('should not activate when code is not provided', done => {
    const route = createRoute({}, {leadId: '123'});

    guard.canActivate(route, routerState).subscribe(result => {
      expect(result).toBeFalse();
      done();
    });
  });
});
