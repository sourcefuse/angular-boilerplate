import {HttpHeaders, HttpParams} from '@angular/common/http';
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
import {GetFeaturesForPlanCommand} from '../../main/commands/get-features-for-plan.command';
import {Features} from '../models/feature.model';
import {Observable, catchError, throwError} from 'rxjs';
import {AddFeaturesForPlanCommand} from '../../main/commands/add-features-for-plan.command';
import {FeatureValues} from '../models/feature-values.model';
import {AuthTokenSkipHeader} from '@project-lib/core/constants';
import {EditFeaturesByPlanIdCommand} from '../../main/commands/edit-features-by-planid.command';
import {GetFeatureByPlanIdCommand} from '../../main/commands/get-feature-by-planid.command';
import {PlanWithFeatures} from '../models/plans-features.model';

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

  getFeatures(): Observable<Features[]> {
    const command: GetFeaturesForPlanCommand<Features[]> =
      new GetFeaturesForPlanCommand(
        this.apiService,
        this.anyAdapter,
        this.appConfig,
      );
    return command.execute();
  }

  addFeatures(
    featureValue: FeatureValues[],
    planId: string,
  ): Observable<Features[]> {
    const command: AddFeaturesForPlanCommand<Features[]> =
      new AddFeaturesForPlanCommand(
        this.apiService,
        this.anyAdapter,
        planId,
        this.appConfig,
      );
    command.parameters = {
      data: featureValue,
    };
    return command.execute();
  }

  editFeatures(featureValue: FeatureValues[], planId: string) {
    const command: EditFeaturesByPlanIdCommand<FeatureValues[]> =
      new EditFeaturesByPlanIdCommand(
        this.apiService,
        this.anyAdapter,
        planId,
        this.appConfig,
      );
    command.parameters = {
      data: featureValue,
    };
    return command.execute();
  }

  getFeatureById(planId: string) {
    const command: GetFeatureByPlanIdCommand<PlanWithFeatures> =
      new GetFeatureByPlanIdCommand(
        this.apiService,
        this.anyAdapter,
        planId,
        this.appConfig,
      );
    return command.execute();
  }
}
