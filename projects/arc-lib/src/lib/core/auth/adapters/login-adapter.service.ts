import { Injectable } from '@angular/core';

import { IAdapter } from '../..';
import { CoreAuthModule } from '../auth.module';
import { LoginModel } from '../models';

@Injectable({
  providedIn: CoreAuthModule,
})
export class LoginAdapterService implements IAdapter<LoginModel> {
  adaptToModel(resp: any): any {
    return resp;
  }
  adaptFromModel(data: LoginModel): any {
    return {
      username: data.username,
      password: data.password,
      clientId: data.clientId,
      clientSecret: data.clientSecret,
    };
  }
}
