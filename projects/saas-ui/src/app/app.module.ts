import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {OverlayModule} from '@angular/cdk/overlay';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from '@project-lib/core/core.module';
import {
  LocalizationModule,
  TranslationService,
} from '@project-lib/core/localization';
import {ThemeModule} from '@project-lib/theme/theme.module';

import {TranslateService, TranslateStore} from '@ngx-translate/core';
import {APP_CONFIG} from '@project-lib/app-config';
import {ApiService} from '@project-lib/core/api';
import {SystemStoreFacadeService} from '@project-lib/core/index';
import {EnvAdapterService} from '@project-lib/core/store/adapters';
import {IconPacksManagerService} from '@project-lib/theme/services';
import {OnBoardingComponent} from './on-boarding/on-boarding.component';
import {NbRadioModule} from '@nebular/theme';
import {AgGridModule} from 'ag-grid-angular';
import { environment } from '../environment';

@NgModule({
  declarations: [AppComponent, OnBoardingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LocalizationModule,
    CoreModule,
    ThemeModule.forRoot('default'),
    OverlayModule,
    BrowserAnimationsModule,
    NbRadioModule,
    AgGridModule,
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
