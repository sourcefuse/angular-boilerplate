import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GTooltipComponent } from './g-tooltip.component';

describe('GTooltipComponent', () => {
  let component: GTooltipComponent;
  let fixture: ComponentFixture<GTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GTooltipComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
