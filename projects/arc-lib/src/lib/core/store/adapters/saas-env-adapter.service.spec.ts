import {TestBed} from '@angular/core/testing';
import {StoreModule} from '../store.module';
import {SaasEnvAdapterService} from './saas-env-adapter.service';

describe('SaasEnvAdapterService', () => {
  let service: SaasEnvAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule],
    });
    service = TestBed.inject(SaasEnvAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
