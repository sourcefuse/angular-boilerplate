import {provideHttpClientTesting} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NgxPermissionsModule} from 'ngx-permissions';

import {ApiModule} from '../api';
import {StoreModule} from '../store';
import {CoreAuthModule} from './auth.module';
import {AuthService} from './auth.service';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreAuthModule,
        RouterTestingModule,
        NgxPermissionsModule.forRoot(),
        StoreModule,
        ApiModule,
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
