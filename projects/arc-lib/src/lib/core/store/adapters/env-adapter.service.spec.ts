import { TestBed } from '@angular/core/testing';

import { StoreModule } from '../store.module';
import { EnvAdapterService } from './env-adapter.service';

describe('EnvAdapterService', () => {
  let service: EnvAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule],
    });
    service = TestBed.inject(EnvAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
