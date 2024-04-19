import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanItemsComponent } from './plan-items.component';

describe('PlanItemsComponent', () => {
  let component: PlanItemsComponent;
  let fixture: ComponentFixture<PlanItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
