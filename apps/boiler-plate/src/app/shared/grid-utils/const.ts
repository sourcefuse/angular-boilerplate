import {InjectionToken} from '@angular/core';
import {GridFilterOptions} from './types';

export const GRID_FILTER_OPTIONS = new InjectionToken<GridFilterOptions>(
  'boiler.grid.filter.options',
);
