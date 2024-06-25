import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CloneBoilerplateDocComponent} from './clone-boilerplate-doc.component';

describe('CloneBoilerplateDocComponent', () => {
  let component: CloneBoilerplateDocComponent;
  let fixture: ComponentFixture<CloneBoilerplateDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloneBoilerplateDocComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CloneBoilerplateDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
