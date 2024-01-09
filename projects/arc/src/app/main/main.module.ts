import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {APP_CONFIG} from '@project-lib/app-config';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbLayoutModule, NbMenuModule, NbThemeModule} from '@nebular/theme';
import { IntroductionComponent } from './introduction/introduction.component';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NbLayoutModule,
    NbMenuModule.forRoot(),
    NbThemeModule.forRoot(),
    ThemeModule,
  ],
})
export class MainModule {}
