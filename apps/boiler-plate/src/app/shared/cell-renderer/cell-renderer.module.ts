import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ThemeModule} from '@boiler/theme/theme.module';
import {NgxPermissionsModule} from 'ngx-permissions';
import {ActionKebabRenderComponent} from './action-kebab-render/action-kebab-render.component';

@NgModule({
  declarations: [ActionKebabRenderComponent],
  imports: [CommonModule, ThemeModule, NgxPermissionsModule],
  exports: [ActionKebabRenderComponent],
})
export class CellRendererModule {}
