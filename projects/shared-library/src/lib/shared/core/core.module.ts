import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPermissionsModule } from 'ngx-permissions';

import { AuthModule } from '../../auth/auth.module';
import { ApiModule } from './api/api.module';
import { CoreAuthModule } from './auth';
import { EnsureModuleLoadedOnce } from './ensure-module-loaded-once';

import { LocalizationModule } from './localization/localization.module';
import { StoreModule } from './store';
import { ToasterModule } from './toaster/toaster.module';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { ComponentBaseDirective } from './component-base';

@NgModule({
  declarations: [ComponentBaseDirective],
  providers: [],
  imports: [
    CommonModule,
    NgxPermissionsModule.forRoot(),
    LoggerModule.forRoot({
      level: NgxLoggerLevel.ERROR,
      serverLogLevel: NgxLoggerLevel.OFF,
    }),
    FormsModule,
    HttpClientModule,
    RouterModule,
    ApiModule,
    LocalizationModule,
    StoreModule,
    ToasterModule,
    CoreAuthModule,
  ],
  exports: [StoreModule, AuthModule, ApiModule, ComponentBaseDirective],
})
export class CoreModule extends EnsureModuleLoadedOnce {
  // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }
}
