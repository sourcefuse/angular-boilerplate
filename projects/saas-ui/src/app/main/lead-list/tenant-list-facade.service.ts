import {Injectable} from '@angular/core';
import {
  AnyAdapter,
  AnyObject,
  ApiService,
  BackendFilter,
} from '@project-lib/core/api';
import {Observable} from 'rxjs';
import {Tenant} from '../../on-boarding/models';
import {
  AddTenantCommand,
  GetTenantLeadListCommand,
  GetTenantByIdCommand,
  EditTenantCommand,
  DeleteTenantCommand,
} from './commands';

import {HttpParams} from '@angular/common/http';

@Injectable()
export class TenantFacadeService {
  constructor(
    private readonly apiService: ApiService,
    private readonly anyAdapter: AnyAdapter,
  ) {}

  getTenantList(
    offset?: number,
    limit?: number,
    filter?: BackendFilter<Tenant>,
    order?: string,
  ) {
    const command: GetTenantLeadListCommand<AnyObject> =
      new GetTenantLeadListCommand(this.apiService, this.anyAdapter);

    const backendFilter: BackendFilter<Tenant> = {
      where: filter.where,
      offset: filter.offset,
      limit: filter.limit,
      order: filter.order,
      include: filter.include || [], // Adding include from filter parameter
    };
    command.parameters = {
      query: new HttpParams().set('filter', JSON.stringify(backendFilter)),
    };
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
