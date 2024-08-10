import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagePlansComponent} from './manage-plans.component';
import {ActivatedRoute} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {of} from 'rxjs';
import {TenantFacadeService} from '../../../shared/services';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {ToasterService} from '@project-lib/theme/toaster/toaster.service';
import {ApiService} from '@project-lib/core/api/api.service';

describe('ManagePlansComponent', () => {
  let component: ManagePlansComponent;
  let fixture: ComponentFixture<ManagePlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePlansComponent],
      imports: [ThemeModule],
      providers: [
        NbToastrService,
        TenantFacadeService,
        ApiService,
        {
          provide: ActivatedRoute,
          useValue: {paramMap: of(new Map())}, // Mock ActivatedRoute
        },
        {
          provide: ToasterService,
          useValue: {paramMap: of(new Map())},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
