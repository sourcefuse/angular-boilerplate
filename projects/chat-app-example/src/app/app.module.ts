import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import {NbChatModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import { NgxNotificationModule } from 'ngx-notification';
import { ChatComponent } from './main/chat/chat.component';
import { UserService } from './main/chat.service';
import { PubNubAngular } from 'pubnub-angular2';
import { InterceptorService } from './main/interceptor';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [AppComponent,ChatComponent],
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
    NgxNotificationModule,
    NoopAnimationsModule,
    NbEvaIconsModule,
    NbChatModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    TranslationService,
    TranslateService,
    IconPacksManagerService,
    TranslateStore,
    SystemStoreFacadeService,
    EnvAdapterService,
    ApiService,
    UserService, PubNubAngular,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
    // other providers...
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
