import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import {NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';

@NgModule({
  declarations: [LoginComponent, AuthComponent],
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
