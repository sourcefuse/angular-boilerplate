import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ThemeModule} from '@boiler/theme/theme.module';

import {SelectModule} from '../select.module';
import {SelectTestComponent} from './select-test.component';

@NgModule({
  declarations: [SelectTestComponent],
  imports: [
    CommonModule,
    SelectModule,
    ThemeModule.forRoot('arc'),
    ReactiveFormsModule,
  ],
  exports: [SelectTestComponent],
})
export class SelectTestModule {}
