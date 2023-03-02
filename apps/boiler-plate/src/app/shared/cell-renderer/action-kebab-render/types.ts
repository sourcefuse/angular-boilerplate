import {AnyObject} from '@boiler/core/api/backend-filter';
import {NbMenuItem} from '@nebular/theme';
import {ICellRendererParams} from 'ag-grid-community';

export interface ICellAction extends NbMenuItem {
  permissions: string[];
}

export type MenuItemMapperFunction<T> = (
  row: T,
  item: NbMenuItem[],
) => NbMenuItem[];

export interface IActionCellParams<T = AnyObject> extends ICellRendererParams {
  // NEED TO REFACTOR TO USE ICELLACTION
  actions: NbMenuItem[];
  menuItemMapper: MenuItemMapperFunction<T>;
  resource?: string[];
}

export interface IGridPageActionHandler<T extends object> {
  handleGridAction(key: string, data: T): void;
}
