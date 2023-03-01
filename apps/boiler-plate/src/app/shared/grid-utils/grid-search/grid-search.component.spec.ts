import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AnyObject} from '@boiler/core/api/backend-filter';
import {CoreModule} from '@boiler/core/core.module';
import {SharedModule} from '@boiler/shared/shared.module';
import {ThemeModule} from '@boiler/theme/theme.module';
import {AbstractGridFilterService} from '../types';

import {GridSearchComponent} from './grid-search.component';

const testSearchOptions = {
  columns: [
    {
      name: 'Test Field',
      field: 'testField',
    },
  ],
};
describe('GridSearchComponent', () => {
  let component: GridSearchComponent<AnyObject>;
  let fixture: ComponentFixture<GridSearchComponent<AnyObject>>;
  let service: jasmine.SpyObj<AbstractGridFilterService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AbstractGridFilterService', [
      'applySearch',
    ]);
    await TestBed.configureTestingModule({
      declarations: [GridSearchComponent],
      providers: [
        {
          provide: AbstractGridFilterService,
          useValue: spy,
        },
      ],
      imports: [ThemeModule.forRoot('boiler'), SharedModule, CoreModule],
    }).compileComponents();
    service = TestBed.inject(
      AbstractGridFilterService,
    ) as jasmine.SpyObj<AbstractGridFilterService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should applySearch on input change', () => {
    component.options = testSearchOptions;
    const currentElement: HTMLElement = fixture.nativeElement;
    const inputElement = currentElement.querySelector('input')!;
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const applySearchCalls = service.applySearch.calls.all();
    expect(applySearchCalls).toHaveSize(1);
    expect(applySearchCalls[0].args[0]).toEqual({
      testField: 'test',
    });
  });
  it('should emit an event on input change', () => {
    component.options = testSearchOptions;
    spyOn(component.searched, 'emit');
    const currentElement: HTMLElement = fixture.nativeElement;
    const inputElement = currentElement.querySelector('input')!;
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searched.emit).toHaveBeenCalledWith({
      testField: 'test',
    });
  });

  it('should trim the input values', () => {
    component.options = testSearchOptions;
    spyOn(component.searched, 'emit');
    const currentElement: HTMLElement = fixture.nativeElement;
    const inputElement = currentElement.querySelector('input')!;
    inputElement.value = 'test  ';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searched.emit).toHaveBeenCalledWith({
      testField: 'test',
    });
  });

  it('should escape the _ and % characters', () => {
    component.options = testSearchOptions;
    spyOn(component.searched, 'emit');
    const currentElement: HTMLElement = fixture.nativeElement;
    const inputElement = currentElement.querySelector('input')!;
    inputElement.value = 'test_%';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searched.emit).toHaveBeenCalledWith({
      testField: 'test\\_\\%',
    });
  });
});
