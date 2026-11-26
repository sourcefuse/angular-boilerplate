import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {CoreModule} from '../core.module';
import {SessionRecoveryInterceptor} from './session-recovery.interceptor';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('SessionRecoveryInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [CoreModule, RouterTestingModule],
      providers: [
        SessionRecoveryInterceptor,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }),
  );

  it('should be created', () => {
    const interceptor: SessionRecoveryInterceptor = TestBed.inject(
      SessionRecoveryInterceptor,
    );
    expect(interceptor).toBeTruthy();
  });
});
