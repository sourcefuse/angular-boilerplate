import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {HeaderComponent} from '@project-lib/components/header/header.component';
@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ThemeModule, HeaderComponent],
})
export class HomeModule {}
