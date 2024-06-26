import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthDocRoutingModule} from './auth-doc-routing.module';
import {DocIntrodutionComponent} from './components/doc-introdution/doc-introdution.component';
import {CliWrapperComponent} from '@project-lib/components/cli-wrapper/cli-wrapper.component';
import {ThemeModule} from '@project-lib/theme/theme.module';

@NgModule({
  declarations: [DocIntrodutionComponent],

  imports: [
    CommonModule,
    AuthDocRoutingModule,
    ThemeModule,
    CliWrapperComponent,
  ],
})
export class AuthDocModule {}
