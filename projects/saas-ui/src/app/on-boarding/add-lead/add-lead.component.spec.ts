import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLeadComponent } from './add-lead.component';

describe('AddLeadComponent', () => {
  let component: AddLeadComponent;
  let fixture: ComponentFixture<AddLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
