import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CoreModule} from '@project-lib/core/core.module';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {SelectModule} from '../select.module';
import {ListComponent} from './list.component';
describe('ListComponent', <T, B extends boolean, S extends T[V], V extends keyof T>() => {
  let component: ListComponent<T, B, S, V>;
  let fixture: ComponentFixture<ListComponent<T, B, S, V>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [SelectModule, ThemeModule.forRoot('arc'), CoreModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent<ListComponent<T, B, S, V>>(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
