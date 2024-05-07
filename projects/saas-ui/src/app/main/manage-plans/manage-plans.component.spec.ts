import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ManagePlansComponent} from './manage-plans.component';

describe('ManagePlansComponent', () => {
  let component: ManagePlansComponent;
  let fixture: ComponentFixture<ManagePlansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagePlansComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManagePlansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
