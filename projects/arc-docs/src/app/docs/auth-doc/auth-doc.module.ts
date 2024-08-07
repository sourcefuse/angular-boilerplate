import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthDocRoutingModule} from './auth-doc-routing.module';
import {DocIntrodutionComponent} from './components/doc-introdution/doc-introdution.component';
import {CliWrapperComponent} from '@project-lib/components/cli-wrapper/cli-wrapper.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {InstallationDocComponent} from './components/installation-doc/installation-doc.component';
import {ConfigureTokenDocComponent} from './components/configure-token-doc/configure-token-doc.component';
import {ApiConfigureDocComponent} from './components/api-configure-doc/api-configure-doc.component';
import {UiConfigureDocComponent} from './components/ui-configure-doc/ui-configure-doc.component';

@NgModule({
  declarations: [
    DocIntrodutionComponent,
    InstallationDocComponent,
    ConfigureTokenDocComponent,
    ApiConfigureDocComponent,
    UiConfigureDocComponent,
  ],
  imports: [
    CommonModule,
    AuthDocRoutingModule,
    ThemeModule,
    CliWrapperComponent,
  ],
})
export class AuthDocModule {}
