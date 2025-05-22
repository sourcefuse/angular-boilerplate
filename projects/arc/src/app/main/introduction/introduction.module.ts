import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IntroductionRoutingModule} from './introduction-routing.module';
import {ThemeModule} from '@project-lib/theme/theme.module';
import { BreadcrumbsComponent } from 'projects/arc-lib/src/lib/components/breadcrumbs/breadcrumbs.component';
import { IntroductionComponent } from './introduction.component';

@NgModule({
  imports: [CommonModule, IntroductionRoutingModule, ThemeModule, BreadcrumbsComponent, IntroductionComponent],
})
export class IntroductionModule {}
