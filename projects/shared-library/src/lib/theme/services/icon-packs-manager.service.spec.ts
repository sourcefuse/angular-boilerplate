import { TestBed } from '@angular/core/testing';

import { ThemeModule } from '../theme.module';
import { IconPacksManagerService } from './icon-packs-manager.service';

describe('IconPacksManagerService', () => {
  let service: IconPacksManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeModule],
    });
    service = TestBed.inject(IconPacksManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
