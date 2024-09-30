import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriberComponent } from './add-subscriber.component';

describe('AddSubscriberComponent', () => {
  let component: AddSubscriberComponent;
  let fixture: ComponentFixture<AddSubscriberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubscriberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubscriberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
