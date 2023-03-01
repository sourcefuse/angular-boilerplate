import {
  Component,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {AnyObject} from '@boiler/core/api/backend-filter';
import {DropDownSettings} from './types';

@Component({
  selector: 'boiler-select',
  templateUrl: './bb-select.component.html',
  styleUrls: ['./bb-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: BbSelectComponent,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class BbSelectComponent<
  T extends object,
  S extends string | number | Date,
> implements ControlValueAccessor, OnChanges
{
  @Input()
  list!: T[];

  @Input()
  settings?: DropDownSettings;

  @Input()
  _value!: S[] | null;

  @Input()
  disabled!: boolean;

  @Input()
  placeholder!: string;

  @Input()
  idField = 'id';

  @Input()
  textField = 'name';

  @Output()
  valueChange!: S[] | null;

  selected!: T[] | null;

  writeState = true;

  set value(val: S[] | null) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  get value() {
    return this._value;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.settings) {
      if (!this.settings.unSelectAllText) {
        this.settings.unSelectAllText = 'All';
      }
      if (!this.settings.selectAllText) {
        this.settings.selectAllText = 'All';
      }
    }
  }

  onChange = (value: S[] | null) => {};

  onTouched = () => {};

  touched = false;

  writeValue(value: S[] | null) {
    this.value = value;
    if (this.writeState) {
      if (value) {
        this.selected = this.list.filter(item =>
          value.includes(
            (item as AnyObject)[this.settings?.idField ?? this.idField],
          ),
        );
      } else {
        this.selected = null;
      }
    }
    this.writeState = true;
  }

  valueChanges(value: T[]) {
    if (value) {
      this.selected = value;
      this.writeState = false;
      this.writeValue(
        value.map(
          v => (v as AnyObject)[this.settings?.idField ?? this.idField],
        ),
      );
    } else if (value === null) {
      this.value = [];
      this.selected = [];
    } else {
      // do nothing
    }
  }

  registerOnChange(onChange: (value: S[] | null) => {}) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => {}) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
