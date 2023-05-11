import { TestBed } from '@angular/core/testing';

import { CoreAuthModule } from '../auth.module';
import { LoginAdapterService } from './login-adapter.service';

describe('LoginAdapterService', () => {
  let service: LoginAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreAuthModule],
    });
    service = TestBed.inject(LoginAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
