import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AnyObject} from '@boiler/core/api/backend-filter';
import {BbSelectModule} from '../bb-select.module';

import {BbSelectComponent} from './bb-select.component';

describe('BbSelectComponent', () => {
  let component: BbSelectComponent<AnyObject, string>;
  let fixture: ComponentFixture<BbSelectComponent<AnyObject, string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BbSelectComponent],
      imports: [BbSelectModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture =
      TestBed.createComponent<BbSelectComponent<AnyObject, string>>(
        BbSelectComponent,
      );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
