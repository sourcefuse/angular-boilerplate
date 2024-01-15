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
import {SystemStoreFacadeService} from '@project-lib/core/store';
import {EnvAdapterService} from '@project-lib/core/store/adapters';
import {ApiService} from '@project-lib/core/api';
import {CoreModule} from '@project-lib/core/core.module';
import {APP_CONFIG} from '@project-lib/app-config';
import {environment} from '../environments/environment';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {OverlayModule} from '@angular/cdk/overlay';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GanttModule} from '@project-lib/components/index';
import {SelectModule} from '@project-lib/components/selector';

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
    OverlayModule,
    SelectModule,
    GanttModule,
    BrowserAnimationsModule,
  ],
  providers: [
    TranslationService,
    TranslateService,
    IconPacksManagerService,
    TranslateStore,
    SystemStoreFacadeService,
    EnvAdapterService,
    ApiService,
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
