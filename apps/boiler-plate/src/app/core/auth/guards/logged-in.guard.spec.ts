import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CoreModule} from '@boiler/core/core.module';
import {StoreModule} from '@boiler/core/store';

import {LoggedInGuard} from './logged-in.guard';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, StoreModule, CoreModule],
    });
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
