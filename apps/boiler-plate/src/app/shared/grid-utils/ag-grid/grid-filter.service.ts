import {Inject, Injectable} from '@angular/core';
import {AnyObject} from '@boiler/core/api/backend-filter';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs';
import {GRID_FILTER_OPTIONS} from '../const';
import {
  AbstractGridFilterService,
  GridFilterOptions,
  GridFilterParams,
  IGridFilterOutput,
  IGridSearchOutput,
} from '../types';
import {AgGridBaseComponent} from './types';
import {AG_GRID_BASED_COMPONENT} from './utils';

@Injectable()
export class AgGridFilterService extends AbstractGridFilterService {
  constructor(
    @Inject(AG_GRID_BASED_COMPONENT)
    private parent: AgGridBaseComponent,
    @Inject(GRID_FILTER_OPTIONS)
    private options: GridFilterOptions,
  ) {
    super();
    this.model
      .pipe(
        filter(params => !!params),
        debounceTime(options.debounceTime),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        map(params => this._inputToModel(params)),
      )
      .subscribe(model => {
        if (this.parent.gridApi) {
          this.parent.gridApi.setFilterModel(model);
          this.parent.gridApi.onFilterChanged();
        }
      });
  }
  applyFilter(filter: IGridFilterOutput) {
    this._model.next({
      ...this._model.value,
      filter,
    });
  }
  applySearch(search: IGridSearchOutput) {
    this._model.next({
      ...this._model.value,
      search,
    });
  }

  /**
   * It takes the filter params and converts them
   * to a model that can be used by the Grid setFilterModel API
   * @param {GridFilterParams} params - GridFilterParams
   * @returns The model is being returned.
   */
  private _inputToModel(params?: GridFilterParams) {
    const model: AnyObject = {};
    if (params?.search) {
      Object.entries(params.search).forEach(([key, value]) => {
        if (value) {
          model[key] = {
            search: value,
          };
        }
      });
    }

    if (params?.filter) {
      Object.entries(params.filter).forEach(([key, value]) => {
        if (value) {
          if (model[key]) {
            model[key].filter = value;
          } else {
            model[key] = {
              filter: value,
            };
          }
        }
      });
    }
    /* Converting the model filters to string. */
    return Object.entries(model).reduce((val, [key, value]) => {
      val[key] = {
        filter: JSON.stringify(value),
      };
      return val;
    }, {} as AnyObject);
  }
}
