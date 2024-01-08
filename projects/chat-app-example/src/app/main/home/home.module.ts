import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {ThemeModule} from '@project-lib/theme/theme.module';
import { UserService } from '../chat.service';
import { PubNubAngular } from 'pubnub-angular2';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../interceptor';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, ThemeModule],
  providers: [UserService, PubNubAngular,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
})
export class HomeModule {}
