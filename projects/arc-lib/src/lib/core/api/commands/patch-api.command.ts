import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAdapter } from '../adapters/i-adapter';
import { IApiService } from '../i-api-service';
import { HttpObserve } from '../types';
import { ICommand } from './i-command';

export abstract class PatchAPICommand<T> implements ICommand {
  constructor(
    protected readonly apiService: IApiService,
    protected readonly adapter: IAdapter<T>,
    protected readonly uri: string
  ) {}

  parameters!: {
    data: Partial<T>;
    headers?: HttpHeaders;
    observe?: HttpObserve;
    query?: HttpParams;
  };

  execute(): Observable<T> {
    if (!this.parameters) {
      throwError(() => new Error(`Parameters missing for PATCH ${this.uri}`));
    }

    // sonarignore:start
    // tslint:disable-next-line:rule no-any
    const options: any = { observe: this.parameters.observe || 'body' };
    if (this.parameters.headers) {
      options.headers = this.parameters.headers;
    }
    // sonarignore:end

    if (this.parameters.query) {
      options.params = this.parameters.query;
    }
    return this.apiService
      .patch(
        this.uri,
        this.adapter.adaptFromModel(this.parameters.data),
        options
      )
      .pipe(map((resp) => resp && this.adapter.adaptToModel(resp)));
  }
}
