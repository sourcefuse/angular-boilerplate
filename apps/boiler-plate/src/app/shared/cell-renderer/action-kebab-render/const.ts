import {InjectionToken} from '@angular/core';
import {AnyObject} from '@boiler/core/api/backend-filter';
import {IGridPageActionHandler} from './types';

export const CELL_PARENT = new InjectionToken<
  IGridPageActionHandler<AnyObject>
>('boiler.kebab-render.parent');
