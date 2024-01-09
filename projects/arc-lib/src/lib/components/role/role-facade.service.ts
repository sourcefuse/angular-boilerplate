import {Inject, Injectable, Optional} from '@angular/core';
import {
  CreateRoleCommand,
  EditRoleCommand,
  GetFeatureActionsCommand,
  GetRoleByIdCommand,
} from './commands';
import {RoleAdapterService} from './adapters/role-adapter.service';
import {AnyAdapter, ApiService} from '@project-lib/core/api';
import {FeatureAction, Role} from './models';
import {GetRolesCommand} from './commands/get-roles.command';
import {ROLE_API_ENDPOINT} from './role.module';
import {RoleApiConfig} from './models/api-config.interface';

@Injectable()
export class RoleFacadeService {
  constructor(
    private readonly apiService: ApiService,
    private readonly anyAdapter: AnyAdapter,
    private readonly roleAdapter: RoleAdapterService,
    @Optional()
    @Inject(ROLE_API_ENDPOINT)
    private readonly endPointConfig: RoleApiConfig,
  ) {}

  getRoles(tenantId: string) {
    const command: GetRolesCommand<Role> = new GetRolesCommand(
      this.apiService,
      this.roleAdapter,
      tenantId,
      this.endPointConfig?.getRoles,
    );

    return command.execute();
  }

  getFeatureActions(tenantId: string) {
    const command: GetFeatureActionsCommand<FeatureAction> =
      new GetFeatureActionsCommand(
        this.apiService,
        this.anyAdapter,
        tenantId,
        this.endPointConfig?.getFeatureActions,
      );

    return command.execute();
  }

  createRole(role: Role, tenantId: string) {
    const command: CreateRoleCommand<Role> = new CreateRoleCommand(
      this.apiService,
      this.roleAdapter,
      tenantId,
      this.endPointConfig?.getFeatureActions,
    );

    command.parameters = {
      data: role,
    };

    return command.execute();
  }

  editRole(role: Role, tenantId: string) {
    const command: EditRoleCommand<Role> = new EditRoleCommand(
      this.apiService,
      this.roleAdapter,
      tenantId,
      role.id,
      this.endPointConfig?.editRole,
    );

    command.parameters = {
      data: role,
    };

    return command.execute();
  }

  getRoleById(roleId: string, tenantId: string) {
    const command: GetRoleByIdCommand<Role> = new GetRoleByIdCommand(
      this.apiService,
      this.roleAdapter,
      tenantId,
      roleId,
      this.endPointConfig?.getRoleById,
    );

    return command.execute();
  }
}
