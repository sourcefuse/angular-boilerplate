import {TestBed} from '@angular/core/testing';

import {StoreModule} from './store.module';
import {UserSessionStoreService} from './user-session-store.service';

describe('UserSessionStoreService', () => {
  let service: UserSessionStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule],
    });
    service = TestBed.inject(UserSessionStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
