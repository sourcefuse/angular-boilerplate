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
import {Observable, Subject} from 'rxjs';
import {GetPlanAdapter} from '../../on-boarding/adapters';
import {GetPlanCommand} from '../../on-boarding/commands';
import {Lead, Plan} from '../models';
import {GetBillingCycles} from '../../main/commands/get-billing-cycles-command';
import {GetCurrencyDetails} from '../../main/commands/get-currency-command';
import {GetBillingDetails} from '../../main/commands/get-billing.command';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {APP_CONFIG} from '@project-lib/app-config';
import {AddPlanCommand} from '../../main/commands/add-plan.command';
import {DeletePlanCommand} from '../../main/commands/delete-plan.command';
import {EditPlanCommand} from '../../main/commands/edit-plan.command';
import {GetPlanByIdCommand} from '../../main/commands/get-plan-by-id.command';
import {GetTotalPlanCommand} from '../../main/commands/get-total-plan.command';
import {GetTotalBillingPlanCommand} from '../../main/commands/get-total-billing-plan.command';

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
export class BillingPlanService {
  constructor(
    private readonly apiService: ApiService,
    private readonly anyAdapter: AnyAdapter,
    @Inject(APP_CONFIG) private readonly appConfig: IAnyObject,
    private readonly getPlanAdapter: GetPlanAdapter,
  ) {}

  getPlanOptions(filter?: BackendFilter<AnyObject>) {
    const command: GetPlanCommand<AnyObject[]> = new GetPlanCommand(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );
    const backendFilter: BackendFilter<AnyObject> = filter
      ? {
          where: filter.where,
          offset: filter.offset,
          limit: filter.limit,
          order: filter.order,
          include: filter.include || [], // Adding include from filter parameter
        }
      : {};
    command.parameters = {
      query: new HttpParams().set('filter', JSON.stringify(backendFilter)),
    };
    return command.execute();
  }
  getBillingDetails() {
    const command: GetBillingDetails<AnyObject> = new GetBillingDetails(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );
    return command.execute();
  }
  getCurrencyDetails() {
    const command: GetCurrencyDetails<AnyObject> = new GetCurrencyDetails(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );
    return command.execute();
  }
  getBillingCycles() {
    const command: GetBillingCycles<AnyObject> = new GetBillingCycles(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );
    return command.execute();
  }

  getTotalBillingPlan() {
    const command: GetTotalBillingPlanCommand<Count> =
      new GetTotalBillingPlanCommand(
        this.apiService,
        this.anyAdapter,
        this.appConfig,
      );

    return command.execute();
  }

  addPlan(plan: Plan): Observable<Plan> {
    const command: AddPlanCommand<Plan> = new AddPlanCommand(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );
    command.parameters = {
      data: plan,
    };
    return command.execute();
  }
  getPlanById(planId: string) {
    const command: GetPlanByIdCommand<Plan> = new GetPlanByIdCommand(
      this.apiService,
      this.anyAdapter,
      planId,
      this.appConfig,
    );
    return command.execute();
  }
  editPlan(plan: Plan, id: string) {
    const command: EditPlanCommand<Plan> = new EditPlanCommand(
      this.apiService,
      this.anyAdapter,
      id,
      this.appConfig,
    );
    command.parameters = {
      data: plan,
    };
    return command.execute();
  }
  deletePlan(planId: 'string') {
    const command: DeletePlanCommand<Plan> = new DeletePlanCommand(
      this.apiService,
      this.anyAdapter,
      planId,
      this.appConfig,
    );
    return command.execute();
  }

  getTotalPlan() {
    const command: GetTotalPlanCommand<Count> = new GetTotalPlanCommand(
      this.apiService,
      this.anyAdapter,
      this.appConfig,
    );

    return command.execute();
  }
}
