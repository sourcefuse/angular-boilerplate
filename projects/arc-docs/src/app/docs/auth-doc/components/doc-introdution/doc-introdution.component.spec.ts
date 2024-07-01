import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DocIntrodutionComponent} from './doc-introdution.component';

describe('DocIntrodutionComponent', () => {
  let component: DocIntrodutionComponent;
  let fixture: ComponentFixture<DocIntrodutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocIntrodutionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocIntrodutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
