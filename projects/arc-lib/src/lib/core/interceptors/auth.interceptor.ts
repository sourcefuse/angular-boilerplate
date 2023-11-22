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
    const authToken = this.sessionStore.getAccessToken() || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRpbnlqb0BleGFtcGxlLmNvbSIsImlhdCI6MTcwMDY2MzM1MSwiZXhwIjoxNzAwNjY1MTUxLCJpc3MiOiJzb3VyY2VmdXNlIiwic3ViIjoidGlueWpvQGV4YW1wbGUuY29tIn0.PYEW3viqGjZsXpLKV9R5L_uKH6raSHXQEogwtKnlqNQ';

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
