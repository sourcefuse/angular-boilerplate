import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {CoreModule} from '../core.module';
import {ErrorInterceptor} from './error.interceptor';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('ErrorInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CoreModule, ThemeModule.forRoot('boiler')],
      providers: [
        ErrorInterceptor,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }),
  );

  it('should be created', () => {
    const interceptor: ErrorInterceptor = TestBed.inject(ErrorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
