import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GuideRoutingModule} from './guide-routing.module';
import {CloneBoilerplateDocComponent} from './components/clone-boilerplate-doc/clone-boilerplate-doc.component';
import {BackendIntegrationDocComponent} from './components/backend-integration-doc/backend-integration-doc.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {CliWrapperComponent} from '@project-lib/components/cli-wrapper/cli-wrapper.component';

@NgModule({
  declarations: [CloneBoilerplateDocComponent, BackendIntegrationDocComponent],
  imports: [CommonModule, GuideRoutingModule, ThemeModule, CliWrapperComponent],
})
export class GuideModule {}
