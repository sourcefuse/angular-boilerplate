import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {HeaderComponent} from '@project-lib/components/header/header.component';
import {SidebarComponent} from '@project-lib/components/sidebar/sidebar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ThemeModule.forRoot('default'),
    HeaderComponent,
    SidebarComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
