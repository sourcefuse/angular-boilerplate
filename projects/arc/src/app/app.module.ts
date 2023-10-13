import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IconPacksManagerService } from '@project-lib/theme/services';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import {
  LocalizationModule,
  TranslationService,
} from '@project-lib/core/localization';
import { SystemStoreFacadeService } from '@project-lib/core/store';
import { InMemoryStorageService } from 'ngx-webstorage-service';
import { EnvAdapterService } from '@project-lib/core/store/adapters';
import { ApiService } from '@project-lib/core/api';
import { CoreModule } from '@project-lib/core/core.module';
import { APP_CONFIG } from '@project-lib/app-config';
import { environment } from '../environments/environment';
import { ThemeModule } from '@project-lib/theme/theme.module';
import { SelectModule } from '@project-lib/components/selector';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule, GanttModule } from '@project-lib/components/index';
import { MainModule } from './main/main.module';

@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LocalizationModule,
    CoreModule,
    AuthModule,
    MainModule,
    ThemeModule,
    NbThemeModule.forRoot(),
    NbLayoutModule,
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
    // other providers...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
