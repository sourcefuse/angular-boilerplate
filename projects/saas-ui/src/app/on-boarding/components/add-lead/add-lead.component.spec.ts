import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddLeadComponent} from './add-lead.component';
import {ActivatedRoute} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {of} from 'rxjs';
import {ApiService} from '@project-lib/core/api';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AddLeadComponent', () => {
  let component: AddLeadComponent;
  let fixture: ComponentFixture<AddLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLeadComponent],
      imports: [HttpClientTestingModule],
      providers: [
        NbToastrService,
        ApiService,
        {
          provide: ActivatedRoute,
          useValue: {paramMap: of(new Map())}, // Mock ActivatedRoute
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
