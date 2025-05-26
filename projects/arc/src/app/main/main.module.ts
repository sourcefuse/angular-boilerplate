import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {HeaderComponent} from '@project-lib/components/header/header.component';
import {SidebarComponent} from '@project-lib/components/sidebar/sidebar.component';
import {BreadcrumbComponent} from '@project-lib/components/index';
import {BreadCrumbIntroductionComponent} from './bread-crumb-introduction/bread-crumb-introduction.component';

@NgModule({
  declarations: [MainComponent, BreadCrumbIntroductionComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    BreadcrumbComponent,
    ThemeModule,
    HeaderComponent,
    SidebarComponent,
  ],
})
export class MainModule {}
