import {Injectable} from '@angular/core';

import {ApiModule} from '../api.module';
import {NameId} from '../models';
import {IAdapter} from './i-adapter';

@Injectable({
  providedIn: ApiModule,
})
export class NameIdAdapter implements IAdapter<NameId> {
  adaptToModel(resp: any): NameId {
    return new NameId(resp);
  }
  adaptFromModel(data: NameId): any {
    return data;
  }
}
