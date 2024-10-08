import {Inject, Injectable} from '@angular/core';
import {
  AnyAdapter,
  AnyObject,
  ApiService,
  BackendFilter,
  Count,
} from '@project-lib/core/api';
import {Observable} from 'rxjs';
import {Tenant} from '../models';
import {
  AddTenantCommand,
  GetTenantLeadListCommand,
  GetTenantByIdCommand,
  EditTenantCommand,
  DeleteTenantCommand,
  GetTenantDetailsCommand,
} from '../../main/commands';

import {HttpParams} from '@angular/common/http';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {GetTotalTenantCommand} from '../../main/commands/get-total-tenant.command';
import {TenantDetails} from '../models/tenantDetails.model';

@Injectable()
export class TenantFacadeService {
  constructor(
    private readonly apiService: ApiService,
    private readonly anyAdapter: AnyAdapter,
    @Inject(APP_CONFIG) private readonly appConfig: IAnyObject,
  ) {}

  getTenantList(filter?: BackendFilter<Tenant>) {
    const command: GetTenantLeadListCommand<AnyObject> =
      new GetTenantLeadListCommand(
        this.apiService,
        this.anyAdapter,
        this.appConfig,
      );

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

  getTotalTenant() {
    const command: GetTotalTenantCommand<Count> = new GetTotalTenantCommand(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );

    return command.execute();
  }

  getTenantDetails(filter?: BackendFilter<TenantDetails>) {
    const command: GetTenantDetailsCommand<TenantDetails> =
      new GetTenantDetailsCommand(
        this.apiService,
        this.anyAdapter,
        this.appConfig,
      );
    const backendFilter: BackendFilter<TenantDetails> = {
      where: filter?.where,
      offset: filter?.offset,
      limit: filter?.limit,
      order: filter?.order,
      include: filter?.include || [],
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
      this.appConfig,
    );

    return command.execute();
  }

  editTenant(tenant: Tenant) {
    const command: EditTenantCommand<Tenant> = new EditTenantCommand(
      this.apiService,
      this.anyAdapter,
      tenant.id,
      this.appConfig,
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
      this.appConfig,
    );
    return command.execute();
  }
}
