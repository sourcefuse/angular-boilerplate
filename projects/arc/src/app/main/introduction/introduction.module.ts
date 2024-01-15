import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IntroductionRoutingModule} from './introduction-routing.module';
import {IntroductionComponent} from './introduction.component';
import {ThemeModule} from '@project-lib/theme/theme.module';

@NgModule({
  declarations: [IntroductionComponent],
  imports: [CommonModule, IntroductionRoutingModule, ThemeModule],
})
export class IntroductionModule {}
