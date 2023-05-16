import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectModule } from '../select.module';
import { SelectTestComponent } from './select-test.component';
import { ThemeModule } from '@main-project/theme/theme.module';

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
