import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfigureTokenDocComponent} from './configure-token-doc.component';

describe('ConfigureTokenDocComponent', () => {
  let component: ConfigureTokenDocComponent;
  let fixture: ComponentFixture<ConfigureTokenDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfigureTokenDocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigureTokenDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
