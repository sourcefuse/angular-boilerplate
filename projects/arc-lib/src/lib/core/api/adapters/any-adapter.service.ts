// tslint:disable:rule no-any
import {Injectable} from '@angular/core';

import {ApiModule} from '../api.module';
import {IAdapter} from './i-adapter';

@Injectable({
  providedIn: ApiModule,
})
export class AnyAdapter implements IAdapter<any> {
  adaptToModel(resp: any): any {
    return resp;
  }
  adaptFromModel(data: any): any {
    return data;
  }
}
