import {GridApi, TextFilterModel} from 'ag-grid-community';

export interface AgGridBaseComponent {
  gridApi?: GridApi;
}

export type Constructor<T> = new (...args: any[]) => T; //NOSONAR

export type AgGridFilterModel<T extends Object> = {
  [key in keyof T]?: TextFilterModel;
};
