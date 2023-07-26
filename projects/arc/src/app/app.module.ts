import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {
  LocalizationModule,
  TranslationService,
} from '@project-lib/core/localization';
import {ApiService} from '@project-lib/core/api';
import {CoreModule} from '@project-lib/core/core.module';
import {APP_CONFIG} from '@project-lib/app-config';
import {environment} from '../environments/environment';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbLayoutModule, NbThemeModule} from '@nebular/theme';

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LocalizationModule,
    CoreModule,
    ThemeModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
  ],
  providers: [
    TranslationService,
    TranslateService,
    IconPacksManagerService,
    TranslateStore,
    ApiService,
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
    // other providers...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
