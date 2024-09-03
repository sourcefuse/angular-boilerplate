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

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
