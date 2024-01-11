import {OverlayModule} from '@angular/cdk/overlay';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbTagModule,
} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {ResizeModule} from '../resize/resize.module';
import {ListComponent} from '../list/list.component';
import {SelectComponent} from './select/select.component';
import { SelectRoutingModule } from './select-routing.module';
import { DetailsModule } from '../Details/details.module';

@NgModule({
  declarations: [SelectComponent, ListComponent],
  imports: [
    CommonModule,
    NbInputModule,
    NbFormFieldModule,
    NbIconModule,
    NbTagModule,
    NbInputModule,
    NbCheckboxModule,
    ReactiveFormsModule,
    ResizeModule,
    ScrollingModule,
    TranslateModule,
    OverlayModule,
    SelectRoutingModule,
    DetailsModule
  ],
  exports: [SelectComponent, ListComponent],
})
export class SelectModule {}
