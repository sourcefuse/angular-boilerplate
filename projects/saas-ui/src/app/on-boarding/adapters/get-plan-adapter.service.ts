import {Injectable} from '@angular/core';
import {Plan} from '../models';
import {pl} from 'date-fns/locale';
import {ApiModule, IAdapter} from '@project-lib/core/api';

@Injectable({
  providedIn: ApiModule,
})
export class GetPlanAdapter implements IAdapter<any> {
  adaptToModel(response: any[]): Plan[] {
    const plans: Plan[] = [];
    response.forEach(resp => {
      const plan: Plan = {
        description: resp.description,
        name: resp.name,
        id: resp.id,
        price: resp.price,
        tier: resp.tier,
        billingCycleId: resp.billingCycleId,
        currencyId: resp.currencyId,
      };
      plans.push(plan);
    });

    return plans;
  }
  adaptFromModel(data: any): any {
    return data;
  }
}
