import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ThemeModule} from '@project-lib/theme/theme.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, ThemeModule.forRoot('default')],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
