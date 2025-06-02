import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MainRoutingModule} from './main-routing.module';
import {MainComponent} from './main.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {HeaderComponent} from '@project-lib/components/header/header.component';
import {SidebarComponent} from '@project-lib/components/sidebar/sidebar.component';
import {BreadcrumbComponent} from '@project-lib/components/index';
import {UserResolver} from '@project-lib/components/breadcrumb/breadcrumb-demo/user/user.resolver';
import {TitleResolver} from '@project-lib/components/breadcrumb/breadcrumb-demo/user-title/user-title.resolver';
import {UserService} from '@project-lib/components/breadcrumb/breadcrumb-demo/user/user.service';
import {TitleService} from '@project-lib/components/breadcrumb/breadcrumb-demo/user-title/user-title.service';

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    ThemeModule,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbComponent,
  ],
  providers: [UserResolver, TitleResolver, UserService, TitleService],
})
export class MainModule {}
