import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AnyAdapter, ApiService} from '@boiler/core/api';
import {AuthTokenSkipHeader, ErrToastSkipHeader} from '@boiler/core/constants';
import {UserSessionStoreService} from '@boiler/core/store';
import {environment} from '@boiler/env/environment';
import {NgxPermissionsService} from 'ngx-permissions';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';

import {LoggedInUserAdapterService, LoginAdapterService} from './adapters';
import {CoreAuthModule} from './auth.module';
import {
  ForgetPasswordCommand,
  GetCurrentUserCommand,
  GetTokenCommand,
  LoginCommand,
  LogoutCommand,
  RefreshTokenCommand,
  ResetPasswordCommand,
  VerifyResetPasswordLinkCommand,
} from './commands';
import {LoggedInUserDM, LoginModel} from './models';

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
    private readonly currentUserAdapter: LoggedInUserAdapterService,
    private readonly loginAdapter: LoginAdapterService,
    private readonly anyAdapter: AnyAdapter,
    private readonly permissionsService: NgxPermissionsService,
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
        new GetCurrentUserCommand(this.apiService, this.currentUserAdapter);
      return command.execute().pipe(
        tap(res => {
          this.store.setUser(res);
          this._loadPermissions(res.permissions);
        }),
      );
    }
  }

  // sonarignore:start
  public forgetPasswordReq(email: string): Observable<any> {
    const command: ForgetPasswordCommand<any> = new ForgetPasswordCommand(
      this.apiService,
      this.anyAdapter,
    );
    // sonarignore:end
    command.parameters = {
      data: {
        username: email.toLowerCase(),
        client_id: environment.clientId,
        client_secret: environment.publicKey,
      },
      observe: 'response',
      headers: this.authTokenSkipHeader,
    };
    return command.execute();
  }

  // sonarignore:start
  public verifyResetPasswordLink(token: string): Observable<any> {
    const command: VerifyResetPasswordLinkCommand<any> =
      new VerifyResetPasswordLinkCommand(this.apiService, this.anyAdapter);
    // sonarignore:end
    command.parameters = {
      data: {
        token: token,
        client_id: environment.clientId,
      },
      observe: 'response',
      headers: this.authTokenSkipHeader,
    };
    return command.execute();
  }

  // sonarignore:start
  public resetPassword(token: string, password: string): Observable<any> {
    const command: ResetPasswordCommand<any> = new ResetPasswordCommand(
      this.apiService,
      this.anyAdapter,
    );
    // sonarignore:end
    command.parameters = {
      data: {
        token,
        password,
        client_id: environment.clientId,
        client_secret: environment.publicKey,
      },
      observe: 'response',
      headers: this.authTokenSkipHeader,
    };
    return command.execute();
  }

  // sonarignore:start
  public login(username: string, password: string): Observable<any> {
    // sonarignore:end
    this.store.setUser({
      username,
    } as LoggedInUserDM);
    const command: LoginCommand<LoginModel> = new LoginCommand(
      this.apiService,
      this.loginAdapter,
    );
    command.parameters = {
      data: {
        username: username.toLowerCase(),
        password,
        clientId: environment.clientId,
        clientSecret: environment.publicKey,
      },
      observe: 'response',
      headers: this.authTokenSkipHeader,
    };
    return command.execute();
  }

  loginViaGoogle(): void {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = `${environment.baseApiUrl}${environment.authServiceUrl}/auth/google`;
    form.style.display = 'none';

    const clientId = document.createElement('input');
    clientId.type = 'hidden';
    clientId.name = 'client_id';
    clientId.value = environment.clientId;
    form.appendChild(clientId);

    const clientSecret = document.createElement('input');
    clientSecret.type = 'hidden';
    clientSecret.name = 'client_secret';
    clientSecret.value = environment.publicKey;
    form.appendChild(clientSecret);
    document.body.appendChild(form);
    form.submit();
  }

  public authorize(secret: string): Observable<boolean> {
    if (!secret) {
      this.router.navigate(['auth/login']);
    }
    // sonarignore:start
    const command: GetTokenCommand<any> = new GetTokenCommand(
      this.apiService,
      this.anyAdapter,
    );
    // sonarignore:end
    command.parameters = {
      data: {
        clientId: environment.clientId,
        code: secret,
      },
      headers: this.authTokenSkipHeader,
    };
    return command.execute().pipe(
      map(response => {
        const redirectTo =
          this.store.getLastAccessedUrl() ?? environment.homePath;
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
  public refreshToken(): Observable<any> {
    // sonarignore:end
    const refreshToken = this.store.getRefreshToken();
    if (!refreshToken) {
      return of(false);
    }
    // sonarignore:start
    const command: RefreshTokenCommand<any> = new RefreshTokenCommand(
      this.apiService,
      this.anyAdapter,
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

  private handleError(error: HttpErrorResponse) {
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    );
  }
}
