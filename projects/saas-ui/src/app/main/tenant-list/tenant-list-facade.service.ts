import {Injectable} from '@angular/core';
import {ApiService, AnyAdapter, AnyObject} from '@project-lib/core/api';
import {Observable} from 'rxjs';
import {Tenant} from '../../on-boarding/models';
import {
  AddTenantCommand,
  GetTenantLeadListCommand,
  GetTenantByIdCommand,
  EditTenantCommand,
  DeleteTenantCommand,
} from './commands';

@Injectable()
export class TenantFacadeService {
  constructor(
    private readonly apiService: ApiService,
    private readonly anyAdapter: AnyAdapter,
  ) {}

  addTenant(tenant: Tenant): Observable<Tenant> {
    const command: AddTenantCommand<Tenant> = new AddTenantCommand(
      this.apiService,
      this.anyAdapter,
    );
    command.parameters = {
      data: tenant,
    };
    return command.execute();
  }

  getTenantList() {
    const command: GetTenantLeadListCommand<AnyObject> =
      new GetTenantLeadListCommand(this.apiService, this.anyAdapter);

    return command.execute();
  }

  getTenantById(tenantId: string) {
    const command: GetTenantByIdCommand<Tenant> = new GetTenantByIdCommand(
      this.apiService,
      this.anyAdapter,
      tenantId,
    );

    return command.execute();
  }

  editTenant(tenant: Tenant) {
    const command: EditTenantCommand<Tenant> = new EditTenantCommand(
      this.apiService,
      this.anyAdapter,
      tenant.id,
    );
    command.parameters = {
      data: tenant,
    };

    return command.execute();
  }

  deleteTenant(tenant: Tenant) {
    const command: DeleteTenantCommand<Tenant> = new DeleteTenantCommand(
      this.apiService,
      this.anyAdapter,
      tenant.id,
    );

    return command.execute();
  }
}
