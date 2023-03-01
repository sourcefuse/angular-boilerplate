import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {
  AbstractGridFilterService,
  IGridSearchOptions,
  IGridSearchOutput,
} from '../types';

@Component({
  selector: 'boiler-grid-search',
  templateUrl: './grid-search.component.html',
  styleUrls: ['./grid-search.component.scss'],
})
export class GridSearchComponent<T extends object> implements OnChanges {
  @Input()
  options?: IGridSearchOptions<T>;

  @Input()
  placeholder!: string;

  @Output()
  searched = new EventEmitter<IGridSearchOutput>();

  constructor(private filterService: AbstractGridFilterService) {}

  ngOnChanges() {
    if (!this.placeholder && this.options?.columns) {
      this.placeholder = `Search by ${this.options.columns
        .map(column => column.name)
        .join(',')}`;
    }
  }

  searchChange(event: Event) {
    const searchOutput = this._mapEventToSearchValue(event);
    this.searched.emit(searchOutput);
    this.filterService.applySearch(searchOutput);
  }

  private _mapEventToSearchValue(event: Event): IGridSearchOutput {
    if (event.target instanceof HTMLInputElement && this.options) {
      const search = event.target.value
        .trim()
        .replace(/\s+/g, ' ')
        // regex to escape _ and % from search value
        .replace(/[_%]/g, '\\$&');

      return this.options.columns.reduce((prev, column) => {
        prev[column.field as string] = search;
        return prev;
      }, {} as Record<string, string>);
    } else {
      return {};
    }
  }
}
