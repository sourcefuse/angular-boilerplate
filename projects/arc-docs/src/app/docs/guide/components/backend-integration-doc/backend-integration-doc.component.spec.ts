import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BackendIntegrationDocComponent} from './backend-integration-doc.component';

describe('BackendIntegrationDocComponent', () => {
  let component: BackendIntegrationDocComponent;
  let fixture: ComponentFixture<BackendIntegrationDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BackendIntegrationDocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackendIntegrationDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
