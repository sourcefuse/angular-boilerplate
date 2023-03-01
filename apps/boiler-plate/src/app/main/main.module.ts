import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ThemeModule} from '../theme';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, ThemeModule],
})
export class MainModule {}
