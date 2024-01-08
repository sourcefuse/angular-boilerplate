/* eslint-disable */
import {Injectable} from '@angular/core';
import {Role} from '../models';
import {IAdapter} from '@project-lib/core/api';

@Injectable()
export class RoleAdapterService implements IAdapter<Role> {
  adaptToModel(resp: any): Role {
    const role = new Role();
    role.id = resp.id;
    role.name = resp.name;
    role.tenantId = resp.tenantId;
    role.actions = resp.actions.map(
      (ele: {id: string; action_key: string}) => ele.action_key,
    );
    role.createdOn = resp.createdOn;
    return role;
  }
  adaptFromModel(data: Role): any {
    return {
      id: data.id,
      name: data.name,
      actions: data.actions,
      tenantId: data.tenantId,
    };
  }
}
