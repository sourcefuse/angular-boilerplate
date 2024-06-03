import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocsComponent} from './docs.component';
import {DocsRoutingModule} from './docs-routing.module';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {HeaderComponent} from '@project-lib/components/header/header.component';
import {SidebarComponent} from '@project-lib/components/sidebar/sidebar.component';
import {AuthService, CoreAuthModule} from '@project-lib/core/auth';
import {HttpClientModule} from '@angular/common/http';
import {NgxPermissionsService, NgxPermissionsStore} from 'ngx-permissions';
import {AuthModule} from '@project-lib/components/index';
import {environment} from '@main-project/boiler/env/environment';
import {APP_CONFIG} from '@project-lib/app-config';

@NgModule({
  declarations: [DocsComponent],
  imports: [
    CommonModule,

    DocsRoutingModule,
    ThemeModule,
    HttpClientModule,
    HeaderComponent,
    SidebarComponent,
    CoreAuthModule,
  ],
  providers: [
    NgxPermissionsStore,
    {
      provide: APP_CONFIG,
      useValue: environment,
    },
  ],
})
export class DocsModule {}
