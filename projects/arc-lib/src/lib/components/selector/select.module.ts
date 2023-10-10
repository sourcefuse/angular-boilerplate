import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbTagModule,
  NbThemeModule,
} from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';
import { ResizeModule } from '../resize/resize.module';
import { SelectComponent } from './select/select.component';
import {ListComponent} from './list/list.component';



@NgModule({
  declarations: [ListComponent,SelectComponent],
  imports: [
    CommonModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    NbTagModule,
    NbLayoutModule,
    NbInputModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    ResizeModule,
    ScrollingModule,
    TranslateModule,
    OverlayModule,
  ],
  exports: [ListComponent,SelectComponent],
})
export class SelectModule {}
