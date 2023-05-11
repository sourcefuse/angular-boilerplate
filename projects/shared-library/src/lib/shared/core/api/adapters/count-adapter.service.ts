import { Injectable } from '@angular/core';

import { ApiModule } from '../api.module';
import { Count } from '../models';
import { IAdapter } from './i-adapter';

@Injectable({
  providedIn: ApiModule,
})
export class CountAdapter implements IAdapter<Count> {
  adaptToModel(resp: any): Count {
    return new Count(resp);
  }
  adaptFromModel(data: Count): any {
    return data;
  }
}
