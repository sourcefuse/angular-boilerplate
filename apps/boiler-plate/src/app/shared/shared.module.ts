import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {TranslateModule} from '@ngx-translate/core';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import {NzDropDownModule} from 'ng-zorro-antd/dropdown';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzSpinModule} from 'ng-zorro-antd/spin';
import {ThemeModule} from '../theme';
import {BbBreadcrumbComponent} from './bb-breadcrumb/bb-breadcrumb.component';
import {BbSelectMultipleComponent} from './bb-select-multiple/bb-select-multiple.component';
import {WarningDialogComponent} from './components/warning-dialog/warning-dialog.component';
@NgModule({
  declarations: [
    BbBreadcrumbComponent,
    BbSelectMultipleComponent,
    WarningDialogComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzInputModule,
    NzCheckboxModule,
    NzDropDownModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzSpinModule,
    ThemeModule,
  ],
  exports: [
    TranslateModule,
    BbBreadcrumbComponent,
    NzSelectModule,
    NzInputModule,
    NzCheckboxModule,
    NzDropDownModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzSpinModule,
    BbSelectMultipleComponent,
  ],
})
export class SharedModule {}
