import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LeadListComponent} from './lead-list.component';
import {ActivatedRoute} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {of} from 'rxjs';

describe('TenantComponent', () => {
  let component: LeadListComponent;
  let fixture: ComponentFixture<LeadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeadListComponent],
      providers: [
        NbToastrService,
        {
          provide: ActivatedRoute,
          useValue: {paramMap: of(new Map())}, // Mock ActivatedRoute
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
