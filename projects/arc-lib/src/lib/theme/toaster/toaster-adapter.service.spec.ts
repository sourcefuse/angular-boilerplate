import { TestBed } from '@angular/core/testing';
import { CoreModule } from '@boiler/core/core.module';

import { ThemeModule } from '../theme.module';
import { ToasterAdapterService } from './toaster-adapter.service';

describe('ToasterAdapterService', () => {
  let service: ToasterAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, ThemeModule],
    });
  });

  it('should be created', () => {
    service = TestBed.inject(ToasterAdapterService);
    expect(service).toBeTruthy();
  });
});
