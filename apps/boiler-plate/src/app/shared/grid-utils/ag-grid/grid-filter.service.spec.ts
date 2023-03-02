import {TestBed, waitForAsync} from '@angular/core/testing';
import {GridApi} from 'ag-grid-community';
import {debounceTime} from 'rxjs';
import {GRID_FILTER_OPTIONS} from '../const';
import {AgGridFilterService} from './grid-filter.service';
import {AG_GRID_BASED_COMPONENT} from './utils';

const testSearch = {
  testField: 'someText',
};

const testMultiFilter = {
  testField: ['something'],
};

const testSingleFilter = {
  testField: 'something',
};

const testSearchSecond = {
  testField: 'secondText',
};

const defaultDebounce = 300;
const bufferedDebounce = 400;

describe('GridFilterService', () => {
  let service: AgGridFilterService;
  let spyGridApi: jasmine.SpyObj<GridApi>;
  beforeEach(() => {
    spyGridApi = jasmine.createSpyObj('GridApi', [
      'setFilterModel',
      'onFilterChanged',
    ]);
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {
          provide: AG_GRID_BASED_COMPONENT,
          useValue: {
            gridApi: spyGridApi,
          },
        },
        {
          provide: GRID_FILTER_OPTIONS,
          useValue: {
            debounceTime: defaultDebounce,
          },
        },
        AgGridFilterService,
      ],
    });
    service = TestBed.inject(AgGridFilterService);
  });

  it('should apply search filter on the filter params subject', () => {
    service.applySearch(testSearch);
    service.model.subscribe(value => {
      expect(value?.search).toEqual(testSearch);
    });
  });

  it('should call grid setFilterModel and onFilterChanged on search change', waitForAsync(() => {
    service.applySearch(testSearch);
    service.model.pipe(debounceTime(bufferedDebounce)).subscribe(value => {
      const setModelCalls = spyGridApi.setFilterModel.calls.all();
      expect(setModelCalls).toHaveSize(1);
      expect(setModelCalls[0].args[0]).toEqual({
        testField: {
          filter: `{"search":"${testSearch.testField}"}`,
        },
      });
    });
  }));

  it('should call grid setFilterModel and onFilterChanged on filter changed for multi-valued filter', waitForAsync(() => {
    service.applyFilter(testMultiFilter);
    service.model.pipe(debounceTime(bufferedDebounce)).subscribe(value => {
      const setModelCalls = spyGridApi.setFilterModel.calls.all();
      expect(setModelCalls).toHaveSize(1);
      expect(setModelCalls[0].args[0]).toEqual({
        testField: {
          filter: `{"filter":${JSON.stringify(testMultiFilter.testField)}}`,
        },
      });
    });
  }));

  it('should call grid setFilterModel and onFilterChanged on filter changed for single-valued filter', waitForAsync(() => {
    service.applyFilter(testSingleFilter);
    service.model.pipe(debounceTime(bufferedDebounce)).subscribe(value => {
      const setModelCalls = spyGridApi.setFilterModel.calls.all();
      expect(setModelCalls).toHaveSize(1);
      expect(setModelCalls[0].args[0]).toEqual({
        testField: {
          filter: `{"filter":"${testSingleFilter.testField}"}`,
        },
      });
    });
  }));

  it('should debounce multiple consecutive calls', waitForAsync(() => {
    service.applySearch(testSearch);
    service.applySearch(testSearchSecond);
    service.model.pipe(debounceTime(bufferedDebounce)).subscribe(value => {
      const setModelCalls = spyGridApi.setFilterModel.calls.all();
      expect(setModelCalls).toHaveSize(1);
      expect(setModelCalls[0].args[0]).toEqual({
        testField: {
          filter: `{"search":"${testSearchSecond.testField}"}`,
        },
      });
    });
  }));
});
