import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {
  AnyAdapter,
  AnyObject,
  ApiService,
  Count,
  Fields,
  Inclusion,
  Where,
} from '@project-lib/core/api';
import {AuthTokenSkipHeader} from '@project-lib/core/constants';
import {Observable} from 'rxjs';
import {
  VerifyEmailCommand,
  GetLeadByIdCommand,
  AddTenantFromLeadCommand,
  AddLeadCommand,
  GetLeadListCommand,
} from '../../on-boarding/commands';
import {GetPlanAdapter} from '../../on-boarding/adapters';
import {Lead, Tenant} from '../models';
import {APP_CONFIG} from '@project-lib/app-config';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {GetTotalLeadCommand} from '../../main/commands/get-total-lead.command';

import {TenantLead} from '../models/tenantLead.model';
import {RegisterTenantCommand} from '../../main/commands/register-tenant.command';

interface BackendFilter<MT extends object = AnyObject> {
  where?: Where<MT>;
  fields?: Fields<MT> | (keyof MT)[];
  order?: string[];
  limit?: number;
  skip?: number;
  offset?: number;
  include?: Inclusion[];
}
@Injectable({
  providedIn: 'root',
})
export class OnBoardingService {
  constructor(
    private readonly apiService: ApiService,
    private readonly anyAdapter: AnyAdapter,
    private readonly getPlanAdapter: GetPlanAdapter,
    @Inject(APP_CONFIG) private readonly appConfig: IAnyObject,
  ) {}

  public validateEmail(code: string, leadId: string) {
    const command: VerifyEmailCommand<{leadId: string; token: string}> =
      new VerifyEmailCommand(
        this.apiService,
        this.anyAdapter,
        leadId,
        this.appConfig,
      );
    // sonarignore:end
    command.parameters = {
      data: {},

      headers: new HttpHeaders()
        .set(AuthTokenSkipHeader, '-')
        .set('Authorization', `Bearer ${code}`),
    };
    return command.execute();
  }

  getLeadDetails(leadId: string): Observable<Lead> {
    const command: GetLeadByIdCommand<Lead> = new GetLeadByIdCommand(
      this.apiService,
      this.anyAdapter,
      leadId,
      this.appConfig,
    );

    return command.execute();
  }

  addTenant(tenant: Tenant, leadId: string) {
    const command: AddTenantFromLeadCommand<Tenant> =
      new AddTenantFromLeadCommand(
        this.apiService,
        this.anyAdapter,
        leadId,
        this.appConfig,
      );
    command.parameters = {
      data: tenant,
    };
    return command.execute();
  }

  registerTenant(tenant: TenantLead) {
    const command: RegisterTenantCommand<TenantLead> =
      new RegisterTenantCommand(
        this.apiService,
        this.anyAdapter,
        this.appConfig,
      );
    command.parameters = {
      data: tenant,
    };
    return command.execute();
  }

  addLead(lead: AnyObject): Observable<Lead> {
    const command: AddLeadCommand<Lead> = new AddLeadCommand(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );
    command.parameters = {
      headers: new HttpHeaders().set(AuthTokenSkipHeader, '-'),
      data: lead,
    };
    return command.execute();
  }

  getLeadList(filter?: BackendFilter<Lead>) {
    const command: GetLeadListCommand<Lead> = new GetLeadListCommand(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );

    const backendFilter: BackendFilter<Lead> = {
      where: filter.where,
      offset: filter.offset,
      limit: filter.limit,
      order: filter.order,
      include: filter.include || [],
    };
    command.parameters = {
      query: new HttpParams().set('filter', JSON.stringify(backendFilter)),
    };
    return command.execute();
  }

  getTotalLead() {
    const command: GetTotalLeadCommand<Count> = new GetTotalLeadCommand(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );

    return command.execute();
  }
}
