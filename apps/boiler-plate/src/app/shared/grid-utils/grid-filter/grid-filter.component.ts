import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AnyObject} from '@boiler/core/api/backend-filter';
import {Subscription} from 'rxjs';
import {
  AbstractGridFilterService,
  FilterType,
  GridFilterParams,
  IGridFilterOptions,
  IGridFilterOutput,
} from '../types';

@Component({
  selector: 'boiler-grid-filter',
  templateUrl: './grid-filter.component.html',
  styleUrls: ['./grid-filter.component.scss'],
})
export class GridFilterComponent<T extends object> implements OnChanges {
  @Input()
  options!: IGridFilterOptions<T>;

  @Input()
  setAllInitially!: boolean;

  @Output()
  filtered = new EventEmitter<IGridFilterOutput>();

  @Output()
  closed = new EventEmitter<boolean>();

  @Output()
  cleared = new EventEmitter<boolean>();

  formGroup!: FormGroup;
  types = FilterType;
  all: AnyObject = {};

  $formSubscription!: Subscription;

  constructor(private filterService: AbstractGridFilterService) {}

  ngOnChanges(): void {
    const initialValue = this.filterService.getLastValue();
    this._updateFilterForm(initialValue);
  }

  filterChange(event?: AnyObject) {
    const filter = this._mapEventToFilterValue(event);
    this.filtered.emit(filter);
    this.filterService.applyFilter(filter);
  }

  clear() {
    this.formGroup.reset();
    this.filterService.applyFilter();
    this.filtered.emit({});
    this.cleared.emit(true);
  }

  close() {
    this.closed.emit(true);
  }

  asString(k: keyof T) {
    return k as string;
  }

  /**
   * It takes an object with key-value pairs, and returns an object with
   * the same key-value pairs, but
   * only if the value is truthy
   * @param {AnyObject} [event] - The event object that is passed to
   * the filter event handler.
   * @returns An object with the column name as the key and the value as the value.
   */
  private _mapEventToFilterValue(
    event?: AnyObject,
  ): IGridFilterOutput | undefined {
    let filter: IGridFilterOutput | undefined;
    Object.entries(event ?? {}).forEach(([column, value]) => {
      if (value && value.length > 0) {
        filter = {
          ...(filter ?? {}),
          [column]: value,
        };
      }
    });
    return filter;
  }

  /**
   * It creates a form group with a form control for each column in the grid
   * @param {GridFilterParams} [initialValue] - This is the initial value of the filter form.
   */
  private _updateFilterForm(initialValue?: GridFilterParams) {
    if (this.options) {
      const groupObject: AnyObject = {};
      this.options.columns.forEach(column => {
        if (this.setAllInitially) {
          groupObject[column.field as string] = new FormControl(
            column.options.map(val => val[column.optionKeys.value]),
          );
        } else {
          groupObject[column.field as string] = new FormControl();
        }
      });
      this.formGroup = new FormGroup(groupObject);
      if (initialValue?.filter) {
        this.formGroup.patchValue(initialValue.filter);
      }
      if (this.$formSubscription) {
        this.$formSubscription.unsubscribe();
      }
      this.$formSubscription = this.formGroup.valueChanges.subscribe(
        formData => {
          this.filterChange(formData);
        },
      );
    }
  }
}
