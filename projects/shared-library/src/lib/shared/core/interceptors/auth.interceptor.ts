import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

import { AuthTokenSkipHeader } from '../constants';
import { UserSessionStoreService } from '../store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private readonly sessionStore: UserSessionStoreService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.headers.has(AuthTokenSkipHeader) || req.url.includes('i18n/')) {
      const headers = req.headers.delete(AuthTokenSkipHeader);
      return next.handle(req.clone({ headers }));
    }
    const authToken = this.sessionStore.getAccessToken();

    if (authToken) {
      return next.handle(
        req.clone({ setHeaders: { Authorization: `Bearer ${authToken}` } })
      );
    } else {
      if (this.route.snapshot.data['skipAuth']) {
        this.router.navigate(['/']);
      }
      return throwError(() => 'Request forbidden ! No access token available.');
    }
  }
}
