import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import {NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';

import {ThemeModule} from '@project-lib/theme/theme.module';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [LoginComponent, AuthComponent, LoginPageComponent, SignupComponent, ForgotPasswordComponent, ResetPasswordComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
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
  exports:[LoginPageComponent]
})
export class AuthModule {}
