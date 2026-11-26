import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {CoreModule} from '../core.module';
import {AuthInterceptor} from './auth.interceptor';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('AuthInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [CoreModule, RouterTestingModule],
      providers: [
        AuthInterceptor,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }),
  );

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
