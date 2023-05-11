import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IconPacksManagerService } from '@main-project/theme/services';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import {
  LocalizationModule,
  TranslationService,
} from '@main-project/core/localization';
import { SystemStoreFacadeService } from '@main-project/core/store';
import { InMemoryStorageService } from 'ngx-webstorage-service';
import { EnvAdapterService } from '@main-project/core/store/adapters';
import { ApiService } from '@main-project/core/api';
import { CoreModule } from '@main-project/core/core.module';
import { APP_CONFIG } from '@main-project/app-config';
import { environment } from '../environments/environment';
import { ThemeModule } from '@main-project/theme/theme.module';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';

@NgModule({
  declarations: [AppComponent],
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
    SystemStoreFacadeService,
    EnvAdapterService,
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
