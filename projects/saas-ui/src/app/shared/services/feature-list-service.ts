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
import {GetFeaturesCommand} from '../../main/commands/get-features.command';
import {Features} from '../models/feature.model';
import {Observable, catchError, throwError} from 'rxjs';
import {AddFeaturesCommand} from '../../main/commands/add-features.command';
import {FeatureValues} from '../models/feature-values.model';
import {AuthTokenSkipHeader} from '@project-lib/core/constants';
import {EditFeaturesCommand} from '../../main/commands/edit-features.command';
import {GetFeatureByIdCommand} from '../../main/commands/get-feature-by-id.command';
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
    const command: GetFeaturesCommand<Features[]> = new GetFeaturesCommand(
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
    const command: AddFeaturesCommand<Features[]> = new AddFeaturesCommand(
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
    const command: EditFeaturesCommand<FeatureValues[]> =
      new EditFeaturesCommand(
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
    const command: GetFeatureByIdCommand<PlanWithFeatures> =
      new GetFeatureByIdCommand(
        this.apiService,
        this.anyAdapter,
        planId,
        this.appConfig,
      );
    return command.execute();
  }
}
