import {NgModule} from '@angular/core';
import {DocsComponent} from './docs.component';
import {DocsRoutingModule} from './docs-routing.module';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {HeaderComponent} from '@project-lib/components/header/header.component';
import {SidebarComponent} from '@project-lib/components/sidebar/sidebar.component';
import {CoreAuthModule} from '@project-lib/core/auth';
import {NgxPermissionsStore} from 'ngx-permissions';
import {environment} from '@main-project/boiler/env/environment';
import {APP_CONFIG} from '@project-lib/app-config';

@NgModule({
  declarations: [DocsComponent],
  imports: [
    DocsRoutingModule,
    ThemeModule,
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
