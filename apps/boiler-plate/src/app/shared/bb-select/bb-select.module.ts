import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ThemeModule} from '@boiler/theme/theme.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {BbSelectComponent} from './bb-select/bb-select.component';

@NgModule({
  declarations: [BbSelectComponent],
  imports: [
    ThemeModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    CommonModule,
  ],
  exports: [BbSelectComponent],
})
export class BbSelectModule {}
