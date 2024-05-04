import {HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {
  AnyAdapter,
  AnyObject,
  ApiService,
  Fields,
  Inclusion,
  Where,
} from '@project-lib/core/api';
import {AuthTokenSkipHeader} from '@project-lib/core/constants';
import {Observable, Subject, filter, map, of} from 'rxjs';
import {
  VerifyEmailCommand,
  GetLeadByIdCommand,
  AddTenantFromLeadCommand,
  GetPlanCommand,
  AddLeadCommand,
  GetLeadListCommand,
} from './commands';
import {GetPlanAdapter} from './adapters';
import {Lead, Tenant, Plan} from './models';

import {GetBillingDetails} from '../main/lead-list/commands/get-billing.command';
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
  private readonly authTokenSkipHeader = new HttpHeaders().set(
    AuthTokenSkipHeader,
    '',
  );

  private validateLead$ = new Subject<Lead>();
  constructor(
    private readonly apiService: ApiService,
    private readonly anyAdapter: AnyAdapter,
    private readonly getPlanAdapter: GetPlanAdapter,
  ) {}

  public validateEmail(
    code: string,
    leadId: string,
  ): Observable<{leadId: string; token: string}> {
    const command: VerifyEmailCommand<{leadId: string; token: string}> =
      new VerifyEmailCommand(this.apiService, this.anyAdapter, leadId);
    // sonarignore:end
    command.parameters = {
      data: {},
      observe: 'response',
      headers: new HttpHeaders()
        .set(AuthTokenSkipHeader, '-')
        .set('Authorization', `Bearer ${code}`),
    };
    return command.execute().pipe(res => res);
  }

  getLeadDetails(leadId: string): Observable<Lead> {
    const command: GetLeadByIdCommand<Lead> = new GetLeadByIdCommand(
      this.apiService,
      this.anyAdapter,
      leadId,
    );

    return command.execute();
  }

  addTenant(tenant: Tenant, leadId: string) {
    const command: AddTenantFromLeadCommand<Tenant> =
      new AddTenantFromLeadCommand(this.apiService, this.anyAdapter, leadId);
    command.parameters = {
      data: tenant,
    };
    return command.execute();
  }

  getPlanOptions(
    offset?: number,
    limit?: number,
    filter?: BackendFilter<AnyObject>,
    order?: string,
  ) {
    const command: GetPlanCommand<Plan[]> = new GetPlanCommand(
      this.apiService,
      this.anyAdapter,
    );
    const backendFilter: BackendFilter<AnyObject> = filter
      ? {
          where: filter.where,
          offset: filter.offset,
          limit: filter.limit,
          order: filter.order,
          include: filter.include || [],
        }
      : {};
    command.parameters = {
      query: new HttpParams().set('filter', JSON.stringify(backendFilter)),
    };
    return command.execute();
  }

  addLead(lead: AnyObject): Observable<Lead> {
    lead.address = {country: lead.country};
    delete lead.country;
    const command: AddLeadCommand<Lead> = new AddLeadCommand(
      this.apiService,
      this.anyAdapter,
    );
    command.parameters = {
      headers: new HttpHeaders().set(AuthTokenSkipHeader, '-'),
      data: lead,
    };
    return command.execute();
  }

  getLeadList(
    offset?: number,
    limit?: number,
    filter?: BackendFilter<Lead>,
    order?: string,
  ) {
    const command: GetLeadListCommand<Lead> = new GetLeadListCommand(
      this.apiService,
      this.anyAdapter,
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
}
