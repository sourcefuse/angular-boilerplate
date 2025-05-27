import {NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER} from '@angular/core';
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
import {OverlayModule} from '@angular/cdk/overlay';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GanttModule} from '@project-lib/components/index';
import {SelectModule} from '@project-lib/components/selector';
import {HeaderComponent} from '@project-lib/components/header/header.component';
import {SidebarComponent} from '@project-lib/components/sidebar/sidebar.component';
import {CspService} from './services/csp.service';

/**
 * The `initCsp` function is a factory function used by Angular's APP_INITIALIZER.
 * It returns a function that applies the Content Security Policy (CSP) using the
 * provided `CspService`.
 *
 * @param cspService - An instance of `CspService` used to apply the CSP configuration
 *                     during application initialization.
 * @returns A function that invokes `cspService.applyCsp()` when called.
 */
function initCsp(cspService: CspService): () => void {
  return () => cspService.applyCsp();
}
@NgModule({
  declarations: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LocalizationModule,
    CoreModule,
    ThemeModule.forRoot('default'),
    OverlayModule,
    SelectModule,
    GanttModule,
    BrowserAnimationsModule,
    HeaderComponent,
    SidebarComponent,
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
    /**
     * This APP_INITIALIZER configuration ensures that the application initializes the
     * Content Security Policy (CSP) before the Angular app starts running.
     *
     * - The `useFactory` property specifies the `initCsp` factory function that will be executed.
     * - The `deps` array indicates that the factory depends on `CspService`, which will be injected.
     */
    {
      provide: APP_INITIALIZER,
      useFactory: initCsp,
      deps: [CspService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
