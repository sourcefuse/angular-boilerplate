import {Injectable} from '@angular/core';
import {IAdapter} from '../../api/adapters';
import {NameId} from '../../api/models';
import {CoreAuthModule} from '../auth.module';
import {LoggedInUserDM} from '../models';

@Injectable({
  providedIn: CoreAuthModule,
})
export class LoggedInUserAdapterService implements IAdapter<LoggedInUserDM> {
  adaptToModel(resp: any): LoggedInUserDM {
    const user: LoggedInUserDM = new LoggedInUserDM();
    if (resp) {
      user.id = resp.id;
      user.firstName = resp.firstName;
      user.middleName = resp.middleName;
      user.lastName = resp.lastName;
      user.username = resp.username;
      user.email = resp.email;
      user.phone = resp.phone;
      user.defaultTenantId = resp.defaultTenantId;
      user.permissions = resp.permissions;
      user.lastLogin = resp.lastLogin;
      user.photo = resp.photoUrl;
      user.tenant = new NameId({id: resp.tenantId});
      user.userTenantId = resp.userTenantId;
      user.role = resp.role;
    }
    // Let it invoke constructor now in order to trigger data validations
    return new LoggedInUserDM(user);
  }

  adaptFromModel(data: LoggedInUserDM): any {
    return data;
  }
}
