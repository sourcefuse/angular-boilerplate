import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GanttZoomBarComponent} from './gantt-zoombar.component';
import {AnyObject} from '@project-lib/core/api';
import {CoreModule} from '@project-lib/core/core.module';
import {LocalizationModule} from '@project-lib/core/localization';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {GanttProviders, GANTT_SCALES} from '../../const';

describe('GanttZoomBarComponent', () => {
  let component: GanttZoomBarComponent<AnyObject>;
  let fixture: ComponentFixture<GanttZoomBarComponent<AnyObject>>;
  let service: IconPacksManagerService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GanttZoomBarComponent],
      providers: [
        GanttProviders,
        {
          provide: GANTT_SCALES,
          useValue: [],
        },
      ],
      imports: [ThemeModule.forRoot('arc'), LocalizationModule, CoreModule],
    }).compileComponents();
    service = TestBed.inject(IconPacksManagerService);
    service.registerFontAwesome();
    service.registerSvgs();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GanttZoomBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
