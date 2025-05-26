import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EyeIconRendererComponent} from './eye-icon-renderer.component';

describe('EyeIconRendererComponent', () => {
  let component: EyeIconRendererComponent;
  let fixture: ComponentFixture<EyeIconRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EyeIconRendererComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EyeIconRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
