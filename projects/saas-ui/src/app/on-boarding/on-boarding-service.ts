import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AnyAdapter, AnyObject} from '@project-lib/core/api';
import {AuthTokenSkipHeader} from '@project-lib/core/constants';
import {Observable, Subject, map, of} from 'rxjs';
import {
  VerifyEmailCommand,
  GetLeadByIdCommand,
  AddTenantFromLeadCommand,
  GetPlanCommand,
  AddLeadCommand,
  GetLeadListCommand,
} from './commands';
import {ValidateLeadAdapter, GetPlanAdapter} from './adapters';
import {Lead, Tenant, Plan} from './models';
import {ApiService} from '../shared /api/api.service';

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
    private readonly validateLeadAdapter: ValidateLeadAdapter,
    private readonly getPlanAdapter: GetPlanAdapter,
  ) {}

  getValidateLead(): Subject<Lead> {
    return this.validateLead$;
  }
  setValidateLead(lead: Lead) {
    this.validateLead$.next(lead);
  }

  public validateEmail(
    code: string,
    leadId: string,
  ): Observable<{leadId: string; token: string}> {
    const command: VerifyEmailCommand<{leadId: string; token: string}> =
      new VerifyEmailCommand(this.apiService, this.validateLeadAdapter, leadId);
    // sonarignore:end
    command.parameters = {
      data: {},
      observe: 'response',
      headers: new HttpHeaders()
        .set(AuthTokenSkipHeader, '-')
        .set('Authorization', `Bearer ${code}`),
    };
    // return of({} as Lead);
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

  addTenant(tenant: Tenant, leadId: string): Observable<Tenant> {
    console.log(tenant);

    const command: AddTenantFromLeadCommand<Tenant> =
      new AddTenantFromLeadCommand(this.apiService, this.anyAdapter, leadId);
    command.parameters = {
      data: tenant,
    };
    return command.execute();
  }

  getPlanOptions(): Observable<Plan[]> {
    const command: GetPlanCommand<Plan[]> = new GetPlanCommand(
      this.apiService,
      this.getPlanAdapter,
    );

    command.parameters = {};
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

  getLeadList() {
    const command: GetLeadListCommand<AnyObject> = new GetLeadListCommand(
      this.apiService,
      this.anyAdapter,
    );

    return command.execute();
  }
}
