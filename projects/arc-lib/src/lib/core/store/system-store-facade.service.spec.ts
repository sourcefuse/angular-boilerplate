import {TestBed} from '@angular/core/testing';
import {CoreModule} from '../core.module';

import {SystemStoreFacadeService} from './system-store-facade.service';

describe('SystemStoreFacadeService', () => {
  let service: SystemStoreFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule],
    });
    service = TestBed.inject(SystemStoreFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
