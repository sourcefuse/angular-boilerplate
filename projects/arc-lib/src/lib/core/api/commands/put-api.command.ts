import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import { IAdapter } from '../adapters/i-adapter';
import { IApiService } from '../i-api-service';
import { HttpObserve } from '../types';
import { ICommand } from './i-command';

export abstract class PutAPICommand<T> implements ICommand {
  constructor(
    protected readonly apiService: IApiService,
    protected readonly adapter: IAdapter<T>,
    protected readonly uri: string
  ) {}

  parameters!: { data: T; headers?: HttpHeaders; observe?: HttpObserve };

  execute(): Observable<T> {
    if (!this.parameters) {
      throwError(() => new Error(`Parameters missing for PUT ${this.uri}`));
    }
    // tslint:disable-next-line:rule no-any
    const options: any = { observe: this.parameters.observe || 'body' };
    if (this.parameters.headers) {
      options.headers = this.parameters.headers;
    }
    return this.apiService
      .put(this.uri, this.adapter.adaptFromModel(this.parameters.data), options)
      .pipe(map((resp) => resp && this.adapter.adaptToModel(resp)));
  }
}
