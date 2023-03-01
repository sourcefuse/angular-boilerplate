import {Injectable} from '@angular/core';
import {IAdapter} from '@boiler/core/api';
import {NbGlobalPhysicalPosition, NbToastrConfig} from '@nebular/theme';
import {isNull, isUndefined} from 'lodash';

import {ToasterConfigExt} from './types';

const timeout = 4000;

@Injectable({
  providedIn: null,
})
export class ToasterAdapterService implements IAdapter<ToasterConfigExt> {
  adaptToModel(data: NbToastrConfig): ToasterConfigExt {
    return new ToasterConfigExt();
  }

  adaptFromModel(data: Partial<ToasterConfigExt>): NbToastrConfig {
    return new NbToastrConfig({
      position: data.position ?? NbGlobalPhysicalPosition.TOP_RIGHT,
      status: data.status ?? 'basic',
      duration: data.timeout ?? timeout,
      preventDuplicates:
        isNull(data.preventDuplicates) ??
        isUndefined(data.preventDuplicates) ??
        data.preventDuplicates,
      toastClass: data.toastClass,
      hasIcon: data.hasIcon,
      icon: data.icon,
      destroyByClick: true,
    });
  }
}
