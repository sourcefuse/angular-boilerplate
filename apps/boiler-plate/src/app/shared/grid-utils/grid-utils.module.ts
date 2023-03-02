import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '@boiler/theme/theme.module';
import {BbSelectModule} from '../bb-select/bb-select.module';
import {AgGridFilterService} from './ag-grid/grid-filter.service';
import {GRID_FILTER_OPTIONS} from './const';
import {GridFilterComponent} from './grid-filter/grid-filter.component';
import {GridSearchComponent} from './grid-search/grid-search.component';
import {AbstractGridFilterService} from './types';

@NgModule({
  declarations: [GridSearchComponent, GridFilterComponent],
  imports: [CommonModule, ReactiveFormsModule, ThemeModule, BbSelectModule],
  exports: [GridSearchComponent, GridFilterComponent],
  providers: [
    {
      provide: GRID_FILTER_OPTIONS,
      useValue: {
        debounceTime: 300,
      },
    },
    {
      provide: AbstractGridFilterService,
      useClass: AgGridFilterService,
    },
  ],
})
export class GridUtilsModule {}
