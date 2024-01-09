import { TestBed } from '@angular/core/testing';

import { RoleFacadeService } from './role-facade.service';

describe('RoleFacadeService', () => {
  let service: RoleFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoleFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
