import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InstallationDocComponent} from './installation-doc.component';

describe('InstallationDocComponent', () => {
  let component: InstallationDocComponent;
  let fixture: ComponentFixture<InstallationDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InstallationDocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstallationDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
