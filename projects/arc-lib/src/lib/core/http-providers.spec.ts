import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {Injectable} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs';

import {APP_CONFIG} from '../app-config';
import {CoreModule} from './core.module';
import {CoreAuthModule} from './auth';
import {LocalizationModule} from './localization/localization.module';
import {TOASTER_SERVICE_KEY} from './toaster';

@Injectable()
class CountingInterceptor implements HttpInterceptor {
  static calls = 0;

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    CountingInterceptor.calls++;
    return next.handle(req);
  }
}

describe('HttpClient providers in the root injector', () => {
  beforeEach(() => {
    CountingInterceptor.calls = 0;
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CoreModule,
        CoreAuthModule,
        LocalizationModule,
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {provide: TOASTER_SERVICE_KEY, useValue: {}},
        {provide: APP_CONFIG, useValue: {}},
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CountingInterceptor,
          multi: true,
        },
      ],
    });
  });

  it('should run each DI interceptor once per request', () => {
    const http = TestBed.inject(HttpClient);
    const backend = TestBed.inject(HttpTestingController);

    http.get('/assets/i18n/ping.json').subscribe();

    expect(backend.match('/assets/i18n/ping.json').length).toBe(1);
    expect(CountingInterceptor.calls).toBe(1);
  });
});
