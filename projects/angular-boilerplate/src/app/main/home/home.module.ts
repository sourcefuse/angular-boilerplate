import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ThemeModule } from '@main-project/theme/theme.module';
import { SharedModule } from '@main-project/shared/shared.module';
import { APP_CONFIG } from '@main-project/app-config';
import { environment } from '@main-project/boiler/env/environment';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ThemeModule],
})
export class HomeModule {}
