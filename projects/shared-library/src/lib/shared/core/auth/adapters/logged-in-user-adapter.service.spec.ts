import { TestBed } from '@angular/core/testing';

import { CoreAuthModule } from '../auth.module';
import { LoggedInUserAdapterService } from './logged-in-user-adapter.service';

describe('LoggedInUserAdapterService', () => {
  let service: LoggedInUserAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreAuthModule],
    });
    service = TestBed.inject(LoggedInUserAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
