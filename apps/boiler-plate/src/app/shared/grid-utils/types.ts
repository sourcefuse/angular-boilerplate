import {BehaviorSubject} from 'rxjs';
export abstract class AbstractGridFilterService {
  protected _model = new BehaviorSubject<GridFilterParams | undefined>(
    undefined,
  );
  get model() {
    return this._model.asObservable();
  }
  abstract applySearch(search?: IGridSearchOutput): void;
  abstract applyFilter(filter?: IGridFilterOutput): void;

  getLastValue() {
    return this._model.value;
  }
}

export type GridFilterParams = {
  search?: IGridSearchOutput;
  filter?: IGridFilterOutput;
};

export type GridFilterOptions = {
  debounceTime: number;
};

import {AnyObject} from '@boiler/core/api/backend-filter';

export interface IGridSearchOptions<T extends object> {
  columns: GridColumn<T>[];
}

export interface IGridFilterOptions<T extends object> {
  columns: GridFilterColumn<T>[];
}

export enum FilterType {
  MultiSelectList,
}

export type GridFilterColumn<T, S = AnyObject> = {
  field: keyof T;
  name: string;
  type: FilterType;
  options: Array<S>;
  optionKeys: {
    name: string;
    value: string;
  };
};

export type GridColumn<T> = {
  field: keyof T;
  name: string;
};

export interface IGridSearchOutput {
  [key: string]: string;
}

export interface IGridFilterOutput {
  [key: string]: FilterValues;
}

export type FilterValues = string[] | Date[] | string | number[] | boolean[];
