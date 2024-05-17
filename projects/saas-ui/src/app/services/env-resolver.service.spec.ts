import {TestBed} from '@angular/core/testing';
import {LoggerTestingModule} from 'ngx-logger/testing';
import {CoreModule} from '../core.module';

import {EnvResolverService} from './env-resolver.service';

describe('EnvResolverService', () => {
  let service: EnvResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, LoggerTestingModule],
    });
    service = TestBed.inject(EnvResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
