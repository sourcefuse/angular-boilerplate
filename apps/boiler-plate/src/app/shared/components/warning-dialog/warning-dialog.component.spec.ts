import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ThemeModule} from '@boiler/theme/theme.module';
import {NbDialogRef} from '@nebular/theme';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

import {WarningDialogComponent} from './warning-dialog.component';

describe('WarningDialogComponent', () => {
  let component: WarningDialogComponent;
  let fixture: ComponentFixture<WarningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WarningDialogComponent],
      imports: [
        ThemeModule.forRoot('boiler'),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [
        {
          provide: NbDialogRef,
          useValue: {
            close: () => {},
          },
        },
        TranslateService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
