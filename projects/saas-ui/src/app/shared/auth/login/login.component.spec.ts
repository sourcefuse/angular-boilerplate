import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AuthModule} from '../auth.module';
import {LoginComponent} from './login.component';
import {
  AuthService,
  LoggedInUserAdapterService,
  LoginAdapterService,
} from '@project-lib/core/auth';
import {UserSessionStoreService} from '@project-lib/core/store';
import {AnyAdapter, ApiService} from '@project-lib/core/api';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {SignUpAdapter} from '@project-lib/core/auth/adapters/signup-adapter.service';
import {NgxPermissionsService} from 'ngx-permissions';
import {APP_CONFIG} from '@project-lib/app-config';
import {Router} from '@angular/router';
const mockAppConfig = {};
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthModule, RouterTestingModule, ThemeModule],
      providers: [
        AuthService,
        ApiService,
        SignUpAdapter,
        AnyAdapter,
        {provide: UserSessionStoreService, useValue: {}},
        {provide: LoggedInUserAdapterService, useValue: {}},
        {provide: LoginAdapterService, useValue: {}},
        {provide: NgxPermissionsService, useValue: {}},
        {provide: APP_CONFIG, useValue: mockAppConfig},
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.value).toEqual({
      email: '',
      password: '',
    });
  });

  it('should validate email field as required and email pattern', () => {
    const email = component.loginForm.get('email');
    email.setValue('');
    expect(email.valid).toBeFalsy();

    email.setValue('invalid-email');
    expect(email.valid).toBeFalsy();

    email.setValue('valid@example.com');
    expect(email.valid).toBeTruthy();
  });

  it('should toggle password visibility', () => {
    expect(component.getInputType()).toBe('password');
    component.toggleShowPassword();
    expect(component.getInputType()).toBe('text');
    component.toggleShowPassword();
    expect(component.getInputType()).toBe('password');
  });
});
