import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbLayoutModule, NbMenuModule, NbThemeModule} from '@nebular/theme';

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
