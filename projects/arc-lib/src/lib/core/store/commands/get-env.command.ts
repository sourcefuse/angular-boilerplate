import { GetAPICommand, IAdapter, IApiService } from '../../api';

export class GetEnvCommand<T> extends GetAPICommand<T> {
  constructor(apiService: IApiService, adapter: IAdapter<T>) {
    super(
      apiService,
      adapter,
      `assets/json/environment.json?t=${new Date().getTime()}`
    );
  }
}
