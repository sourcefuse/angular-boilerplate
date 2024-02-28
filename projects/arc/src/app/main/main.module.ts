import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {HeaderComponent} from 'projects/arc-lib/src/public-api';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, ThemeModule, HeaderComponent],
})
export class MainModule {}
