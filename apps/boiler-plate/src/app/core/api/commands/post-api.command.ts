import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {map} from 'rxjs/operators';

import {IAdapter} from '../adapters/i-adapter';
import {IApiService} from '../i-api-service';
import {HttpObserve} from '../types';
import {ICommand} from './i-command';

export abstract class PostAPICommand<T extends Partial<R>, R = T>
  implements ICommand {
  constructor(
    protected readonly apiService: IApiService,
    protected readonly adapter: IAdapter<T, R>,
    protected readonly uri: string,
  ) {}

  parameters!: {
    data: T;
    headers?: HttpHeaders;
    observe?: HttpObserve;
    query?: HttpParams;
    reportProgress?: boolean;
  };

  execute(): Observable<R> {
    if (!this.parameters) {
      throwError(() => new Error(`Parameters missing for POST ${this.uri}`));
    }
    // tslint:disable-next-line:rule no-any
    const options: any = {};
    options.observe = this.parameters.observe || 'body';
    options.reportProgress = this.parameters.reportProgress;
    if (this.parameters.headers) {
      options.headers = this.parameters.headers;
    }
    return this.apiService
      .post(
        this.uri,
        this.adapter.adaptFromModel(this.parameters.data),
        options,
      )
      .pipe(
        map(resp => {
          if (!options.reportProgress) {
            return this.adapter.adaptToModel(resp);
          } else {
            return resp;
          }
        }),
      );
  }
}
