import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {APP_CONFIG} from '@project-lib/app-config';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {NbLayoutModule, NbThemeModule} from '@nebular/theme';
import { HomeModule } from './home/home.module';
import { MainHomeComponent } from './main-home/main-home.component';

@NgModule({
  declarations: [MainComponent, MainHomeComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    NbLayoutModule,
    NbThemeModule.forRoot(),
    ThemeModule,
    HomeModule,
  ],
  exports:[MainHomeComponent]
})
export class MainModule {}
