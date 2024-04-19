import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TenantComponent} from './tenant-list.component';

describe('TenantComponent', () => {
  let component: TenantComponent;
  let fixture: ComponentFixture<TenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TenantComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
