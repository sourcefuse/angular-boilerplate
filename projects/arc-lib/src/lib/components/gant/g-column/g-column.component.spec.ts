import {ComponentFixture, TestBed} from '@angular/core/testing';

import {GColumnComponent} from './g-column.component';

describe('GColumnComponent', () => {
  let component: GColumnComponent;
  let fixture: ComponentFixture<GColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
