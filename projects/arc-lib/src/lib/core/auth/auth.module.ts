import {CommonModule} from '@angular/common';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {NgxPermissionsModule} from 'ngx-permissions';

import {ApiModule} from '../api';
import {StoreModule} from '../store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    ApiModule,
    StoreModule,
    NgxPermissionsModule.forChild(),
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class CoreAuthModule {}
