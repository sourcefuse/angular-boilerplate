import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';
import {BbSelectMultipleComponent} from './bb-select-multiple.component';
describe('BbSelectMultipleComponent', () => {
  let component: BbSelectMultipleComponent;
  let fixture: ComponentFixture<BbSelectMultipleComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BbSelectMultipleComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BbSelectMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
