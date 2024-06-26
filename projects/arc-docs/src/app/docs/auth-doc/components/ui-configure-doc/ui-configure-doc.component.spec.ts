import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiConfigureDocComponent } from './ui-configure-doc.component';

describe('UiConfigureDocComponent', () => {
  let component: UiConfigureDocComponent;
  let fixture: ComponentFixture<UiConfigureDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiConfigureDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiConfigureDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
