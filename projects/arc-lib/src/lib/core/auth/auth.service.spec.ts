import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPermissionsModule } from 'ngx-permissions';

import { ApiModule } from '../api';
import { StoreModule } from '../store';
import { CoreAuthModule } from './auth.module';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreAuthModule,
        RouterTestingModule,
        HttpClientTestingModule,
        NgxPermissionsModule.forRoot(),
        StoreModule,
        ApiModule,
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
