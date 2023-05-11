import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { TranslateModule } from '@ngx-translate/core';

import { ThemeModule } from '../theme';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ThemeModule,
    AuthRoutingModule,
    HttpClientModule,
    NbLayoutModule,
    TranslateModule,
    NbThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
        }),
      ],
      forms: {},
    }),
  ],
})
export class AuthModule {}
