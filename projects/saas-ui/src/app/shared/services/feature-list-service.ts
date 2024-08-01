import {HttpParams} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {
  AnyAdapter,
  AnyObject,
  ApiService,
  Fields,
  Inclusion,
  Where,
} from '@project-lib/core/api';
import {GetPlanAdapter} from '../../on-boarding/adapters';
import {GetPlanCommand} from '../../on-boarding/commands';
import {IAnyObject} from '@project-lib/core/i-any-object';
import {APP_CONFIG} from '@project-lib/app-config';
import {GetFeaturesCommand} from '../../main/commands/get-features.command';

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
export class FeatureListService {
  constructor(
    private readonly apiService: ApiService,
    private readonly anyAdapter: AnyAdapter,
    @Inject(APP_CONFIG) private readonly appConfig: IAnyObject,
    private readonly getPlanAdapter: GetPlanAdapter,
  ) {}

  getFeatures(filter?: BackendFilter<AnyObject>) {
    const command: GetFeaturesCommand<AnyObject[]> = new GetFeaturesCommand(
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
}
