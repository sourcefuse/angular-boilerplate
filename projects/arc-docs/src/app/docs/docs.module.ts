import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocsComponent} from './docs.component';
import {DocsRoutingModule} from './docs-routing.module';
import {ThemeModule} from '@project-lib/theme/theme.module';

@NgModule({
  declarations: [DocsComponent],
  imports: [CommonModule, DocsRoutingModule, ThemeModule],
})
export class DocsModule {}
