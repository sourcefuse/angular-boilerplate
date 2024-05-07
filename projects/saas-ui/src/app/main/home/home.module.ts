import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbRadioModule} from '@nebular/theme';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ThemeModule, NbRadioModule],
})
export class HomeModule {}
