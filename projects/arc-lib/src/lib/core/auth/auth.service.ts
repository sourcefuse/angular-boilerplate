import {HttpHeaders} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {APP_CONFIG} from '@project-lib/app-config';

import {
  CoreAuthModule,
  LoggedInUserAdapterService,
  LoginAdapterService,
  LoggedInUserDM,
  ForgetPasswordCommand,
  VerifyResetPasswordLinkCommand,
  ResetPasswordCommand,
  LoginCommand,
  LoginModel,
  RefreshTokenCommand,
  LogoutCommand,
  GetTokenCommand,
  GetCurrentUserCommand,
} from '@project-lib/core/auth';
import {SignUpAdapter} from '@project-lib/core/auth/adapters/signup-adapter.service';
import {CreateExternalUserCommand} from '@project-lib/core/auth/commands/create-external-user.command';
import {CreateTokenCommand} from '@project-lib/core/auth/commands/create-token.command';
import {
  AuthTokenSkipHeader,
  ErrToastSkipHeader,
} from '@project-lib/core/constants';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {
  AnyAdapter,
  ApiService,
  UserSessionStoreService,
} from '@project-lib/core/index';
import {NgxPermissionsService} from 'ngx-permissions';
import {
  Observable,
  switchMap,
  of,
  throwError,
  tap,
  map,
  catchError,
  take,
  from,
} from 'rxjs';

@Injectable({
  providedIn: CoreAuthModule,
})
export class AuthService {
  private readonly authTokenSkipHeader = new HttpHeaders().set(
    AuthTokenSkipHeader,
    '',
  );
  private readonly errorToastSkipHeader = new HttpHeaders().set(
    ErrToastSkipHeader,
    '',
  );
  constructor(
    private readonly router: Router,
    private readonly store: UserSessionStoreService,
    private readonly apiService: ApiService,
    private readonly signUpAdapter: SignUpAdapter,
    private readonly currentUserAdapter: LoggedInUserAdapterService,
    private readonly loginAdapter: LoginAdapterService,
    private readonly anyAdapter: AnyAdapter,
    private readonly permissionsService: NgxPermissionsService,
    @Inject(APP_CONFIG) private readonly appConfig: IAnyObject,
  ) {}

  public isLoggedIn(): Observable<boolean> {
    return this.currentUser().pipe(
      switchMap(user => {
        if (user && user.id && this.store.getAccessToken()) {
          return of(true);
        } else {
          return of(false);
        }
      }),
    );
  }

  public currentUser(): Observable<LoggedInUserDM> {
    const user = this._loadUserFromStore();
    const hasToken = !!this.store.getAccessToken();
    if (user) {
      return of(user);
    } else if (!hasToken) {
      return throwError(() => new Error('No token available'));
    } else {
      const command: GetCurrentUserCommand<LoggedInUserDM> =
        new GetCurrentUserCommand(
          this.apiService,
          this.currentUserAdapter,
          this.appConfig,
        );
      return command.execute().pipe(
        tap(res => {
          this.store.setUser(res);
          this._loadPermissions(res.permissions);
        }),
      );
    }
  }

  // sonarignore:start
  public forgetPasswordReq(email: string): Observable<IAnyObject> {
    const command: ForgetPasswordCommand<IAnyObject> =
      new ForgetPasswordCommand(
        this.apiService,
        this.anyAdapter,
        this.appConfig,
      );
    // sonarignore:end
    command.parameters = {
      data: {
        username: email.toLowerCase(),
        client_id: this.appConfig.clientId,
        client_secret: this.appConfig.publicKey,
      },
      observe: 'response',
      headers: this.authTokenSkipHeader,
    };
    return command.execute();
  }

  // sonarignore:start
  public verifyResetPasswordLink(token: string): Observable<IAnyObject> {
    const command: VerifyResetPasswordLinkCommand<IAnyObject> =
      new VerifyResetPasswordLinkCommand(
        this.apiService,
        this.anyAdapter,
        this.appConfig,
      );
    // sonarignore:end
    command.parameters = {
      data: {
        token: token,
        client_id: this.appConfig.clientId,
      },
      observe: 'response',
      headers: this.authTokenSkipHeader,
    };
    return command.execute();
  }

  // sonarignore:start
  public resetPassword(
    token: string,
    password: string,
  ): Observable<IAnyObject> {
    const command: ResetPasswordCommand<IAnyObject> = new ResetPasswordCommand(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );
    // sonarignore:end
    command.parameters = {
      data: {
        token,
        password,
        client_id: this.appConfig.clientId,
        client_secret: this.appConfig.publicKey,
      },
      observe: 'response',
      headers: this.authTokenSkipHeader,
    };
    return command.execute();
  }

  // sonarignore:start
  public login(username: string, password: string): Observable<IAnyObject> {
    // sonarignore:end
    this.store.setUser({
      username,
    } as LoggedInUserDM);
    const command: LoginCommand<LoginModel> = new LoginCommand(
      this.apiService,
      this.loginAdapter,
      this.appConfig,
    );
    command.parameters = {
      data: {
        username: username.toLowerCase(),
        password,
        client_id: this.appConfig.clientId,
        client_secret: this.appConfig.publicKey,
      },
      observe: 'response',
      headers: this.authTokenSkipHeader,
    };
    return command.execute();
  }

  loginViaGoogle(): void {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${this.appConfig.baseApiUrl}${this.appConfig.authServiceUrl}/auth/google`;
    form.style.display = 'none';

    const clientId = document.createElement('input');
    clientId.type = 'hidden';
    clientId.name = 'client_id';
    clientId.value = this.appConfig.clientId;
    form.appendChild(clientId);

    const clientSecret = document.createElement('input');
    clientSecret.type = 'hidden';
    clientSecret.name = 'client_secret';
    clientSecret.value = this.appConfig.publicKey;
    form.appendChild(clientSecret);
    document.body.appendChild(form);
    form.submit();
  }

  createExternalUser(user) {
    const command = new CreateExternalUserCommand(
      this.apiService,
      this.signUpAdapter,
      this.appConfig,
    );

    command.parameters = {
      data: user,
    };

    return command.execute();
  }

  createToken(email) {
    const command = new CreateTokenCommand(
      this.apiService,
      this.signUpAdapter,
      this.appConfig,
    );

    command.parameters = {
      data: email,
    };

    return command.execute();
  }

  public authorize(secret: string): Observable<boolean> {
    if (!secret) {
      this.router.navigate(['auth/login']);
    }
    // sonarignore:start
    const command: GetTokenCommand<IAnyObject> = new GetTokenCommand(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );
    // sonarignore:end
    command.parameters = {
      data: {
        clientId: this.appConfig.clientId,
        code: secret,
      },
      headers: this.authTokenSkipHeader,
    };
    return command.execute().pipe(
      map(response => {
        const redirectTo =
          this.store.getLastAccessedUrl() ?? this.appConfig.homePath;

        if (response.accessToken && response.refreshToken) {
          this.store.saveAccessToken(response.accessToken);
          this.store.saveRefreshToken(response.refreshToken);
          this.store.saveTokenExpiry(response.expires);
          this.router.navigate([redirectTo]);
          return true;
        }
        return false;
      }),
    );
  }

  // sonarignore:start
  public refreshToken(): Observable<IAnyObject | boolean> {
    // sonarignore:end
    const refreshToken = this.store.getRefreshToken();
    if (!refreshToken) {
      return of(false);
    }
    // sonarignore:start
    const command: RefreshTokenCommand<IAnyObject> = new RefreshTokenCommand(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );
    // sonarignore:end
    command.parameters = {
      data: {
        refreshToken,
      },
      headers: this.errorToastSkipHeader,
    };
    return command
      .execute()
      .pipe(
        tap({
          next: response => {
            if (response.accessToken && response.refreshToken) {
              this.store.clearAll();
              this.store.saveAccessToken(response.accessToken);
              this.store.saveRefreshToken(response.refreshToken);
              this.store.saveTokenExpiry(response.expires);
            } else {
              this.logout();
            }
          },
          error: () => {
            this.clearAllData();
          },
        }),
      )
      .pipe(catchError(this.handleError));
  }

  public logout(): Observable<boolean> {
    const refreshToken = this.store.getRefreshToken();
    if (!refreshToken) {
      this.clearAllData();
      return of(false);
    }
    const command: LogoutCommand<unknown> = new LogoutCommand(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );
    command.parameters = {
      data: {
        refreshToken,
      },
      headers: this.errorToastSkipHeader,
    };
    return command.execute().pipe(
      map(() => {
        this.clearAllData();
        return true;
      }),
    );
  }

  loginViaCognito(): void {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${this.appConfig.baseApiUrl}${this.appConfig.authServiceUrl}/auth/cognito`;
    form.style.display = 'none';

    const clientId = document.createElement('input');
    clientId.type = 'hidden';
    clientId.name = 'client_id';
    clientId.value = 'test_client_id';
    form.appendChild(clientId);

    const clientSecret = document.createElement('input');
    clientSecret.type = 'hidden';
    clientSecret.name = 'client_secret';
    clientSecret.value = 'test_client_secret';
    form.appendChild(clientSecret);
    document.body.appendChild(form);
    form.submit();
  }

  logoutCognito() {
    const form = document.createElement('form');
    form.method = 'GET';
    form.action = `${this.appConfig.cognitoLogoutUrl}/logout`;
    form.style.display = 'none';

    const clientId = document.createElement('input');
    clientId.type = 'hidden';
    clientId.name = 'client_id';
    clientId.value = this.appConfig.clientId;
    form.appendChild(clientId);

    const clientSecret = document.createElement('input');
    clientSecret.type = 'hidden';
    clientSecret.name = 'logout_uri';
    clientSecret.value = this.appConfig.publicKey;
    form.appendChild(clientSecret);
    document.body.appendChild(form);
    form.submit();
  }

  private _loadPermissions(permissions: string[]) {
    const perms = this.permissionsService.getPermissions();
    const entityPerms: string[] = [];
    for (const key in perms) {
      if (
        Object.prototype.hasOwnProperty.call(perms, key) &&
        key.includes('/')
      ) {
        entityPerms.push(key);
      }
    }

    this.permissionsService.loadPermissions([...permissions, ...entityPerms]);
  }

  private _loadUserFromStore() {
    const user = this.store.getUser();

    if (user && user.id) {
      this._checkIfPermissionsAlreadyExists(user.permissions)
        .pipe(
          tap(exists => {
            if (!exists) {
              this._loadPermissions(user.permissions);
            }
          }),
        )
        .pipe(take(1))
        .subscribe();
      return user;
    }
    return null;
  }

  private _checkIfPermissionsAlreadyExists(permissions: string[]) {
    return from(this.permissionsService.hasPermission(permissions));
  }

  private clearAllData() {
    this.store.clearAll();
    this.permissionsService.flushPermissions();
    window.location.href = 'login';
  }

  private handleError() {
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
}
