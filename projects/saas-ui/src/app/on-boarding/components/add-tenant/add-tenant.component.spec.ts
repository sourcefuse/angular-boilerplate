import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddTenantComponent} from './add-tenant.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';
import {NbToastrModule, NbToastrService} from '@nebular/theme';

describe('AddTenantComponent', () => {
  let component: AddTenantComponent;
  let fixture: ComponentFixture<AddTenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTenantComponent],
      imports: [NbToastrModule.forRoot()],
      providers: [
        NbToastrService,
        NbToastrService,
        {
          provide: ActivatedRoute,
          useValue: {paramMap: of(new Map())}, // Mock ActivatedRoute
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
