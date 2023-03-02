import {TestBed} from '@angular/core/testing';
import {CoreModule} from '@boiler/core/core.module';
import {IToaster, TOASTER_SERVICE_KEY} from '@boiler/core/toaster';
import {ThemeModule} from '..';

import {ToasterAdapterService} from './toaster-adapter.service';
import {ToasterService} from './toaster.service';

describe('ToasterService', () => {
  let service: IToaster;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ThemeModule.forRoot('boiler'), CoreModule],
      providers: [
        ToasterAdapterService,
        {
          provide: TOASTER_SERVICE_KEY,
          useClass: ToasterService,
        },
      ],
    });
    service = TestBed.inject(TOASTER_SERVICE_KEY);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
