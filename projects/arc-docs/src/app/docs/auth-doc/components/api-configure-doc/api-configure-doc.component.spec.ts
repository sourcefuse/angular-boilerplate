import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiConfigureDocComponent } from './api-configure-doc.component';

describe('ApiConfigureDocComponent', () => {
  let component: ApiConfigureDocComponent;
  let fixture: ComponentFixture<ApiConfigureDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApiConfigureDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiConfigureDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
