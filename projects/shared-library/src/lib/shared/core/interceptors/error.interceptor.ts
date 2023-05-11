import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { get } from 'lodash';
import { catchError, Observable } from 'rxjs';

import { STATUS_CODE } from '../api';
import { ErrToastSkipHeader } from '../constants';
import { IToaster, TOASTER_SERVICE_KEY } from '../toaster';

const errorMsgConst = 'error.error.message.message';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    @Inject(TOASTER_SERVICE_KEY) private readonly toastrService: IToaster
  ) {}

  private _checkTokenExpiryErr(error: HttpErrorResponse): boolean {
    return (
      error.status &&
      error.status === STATUS_CODE.UNAUTHORIZED &&
      error.error &&
      error.error.error &&
      error.error.error.message &&
      error.error.error.message.message === 'TokenExpired'
    );
  }

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.headers.has(ErrToastSkipHeader)) {
      const headers = req.headers.delete(ErrToastSkipHeader);
      return next.handle(req.clone({ headers }));
    } else {
      return next.handle(req).pipe(
        catchError((error) => {
          if (
            error instanceof HttpErrorResponse &&
            error.error.error?.statusCode === STATUS_CODE.UNPROCESSABLE_ENTITY
          ) {
            const errMsg = this.getErrMsg(error);
            this.toastrService.error(errMsg, 'ERROR !');
          } else if (
            error instanceof HttpErrorResponse &&
            !this._checkTokenExpiryErr(error)
          ) {
            let errMsg = get(error, errorMsgConst);
            errMsg =
              errMsg ||
              get(
                error,
                'error.error.message',
                'Some error occured. Please try again.'
              );
            this.toastrService.error(errMsg, 'ERROR !');
          } else {
            // Do nothing
          }
          throw error;
        })
      );
    }
  }

  getErrMsg(err: { [key: string | symbol]: any }) {
    const errDetails =
      get(err, 'error.error.details') || get(err, 'error.error.message');
    let errMsg: string | undefined;
    if (Array.isArray(errDetails)) {
      errDetails.forEach((item) => {
        if (errMsg) {
          errMsg = `${errMsg} \
            ${item.path} ${item.message}`;
        } else {
          errMsg = `${item.path} ${item.message}`;
        }
      });
    } else {
      errMsg = errDetails;
    }
    return errMsg;
  }
}
