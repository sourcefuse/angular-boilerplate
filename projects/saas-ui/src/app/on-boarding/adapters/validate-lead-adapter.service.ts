// tslint:disable:rule no-any
import {Injectable} from '@angular/core';
import {ApiModule, IAdapter} from '@project-lib/core/api';

@Injectable({
  providedIn: ApiModule,
})
export class ValidateLeadAdapter implements IAdapter<any> {
  adaptToModel(resp: any): any {
    return resp.body;
  }
  adaptFromModel(data: any): any {
    return data;
  }
}
