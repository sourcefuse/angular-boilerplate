import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { NameIdRequired } from '@boiler/core/api';

@Component({
  selector: 'select-test',
  templateUrl: './select-test.component.html',
})
export class SelectTestComponent {
  options: NameIdRequired[] = [];
  multiple = false;
  allowInput = false;
  disabled = false;
  placeholder = 'Select';
  search = false;
  control = new UntypedFormControl();
}
