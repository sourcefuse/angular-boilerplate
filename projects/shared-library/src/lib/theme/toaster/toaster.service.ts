import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ToasterAdapterService } from './toaster-adapter.service';
import { ToasterConfigExt } from './types';
import { IToaster } from '@main-project/core/toaster';
import { IAnyObject } from '@main-project/core/i-any-object';
@Injectable({
  providedIn: null,
})
export class ToasterService implements IToaster {
  constructor(
    private readonly toastrSvc: NbToastrService,
    private readonly configAdapter: ToasterAdapterService
  ) {}

  show(
    message: string,
    title?: string,
    config?: Partial<ToasterConfigExt>
  ): IAnyObject {
    const conf = config && this.configAdapter.adaptFromModel(config);
    return this.toastrSvc.show(message, title, conf);
  }

  success(
    message: string,
    title?: string,
    config?: Partial<ToasterConfigExt>
  ): IAnyObject {
    const conf =
      config &&
      this.configAdapter.adaptFromModel(
        Object.assign({}, config, { status: 'success' })
      );
    return this.toastrSvc.success(message, title, conf);
  }

  info(
    message: string,
    title?: string,
    config?: Partial<ToasterConfigExt>
  ): IAnyObject {
    const conf =
      config &&
      this.configAdapter.adaptFromModel(
        Object.assign({}, config, { status: 'info' })
      );
    return this.toastrSvc.info(message, title, conf);
  }

  warn(
    message: string,
    title?: string,
    config?: Partial<ToasterConfigExt>
  ): IAnyObject {
    const conf =
      config &&
      this.configAdapter.adaptFromModel(
        Object.assign({}, config, { status: 'warning' })
      );
    return this.toastrSvc.warning(message, title, conf);
  }

  error(
    message: string,
    title?: string,
    config?: Partial<ToasterConfigExt>
  ): IAnyObject {
    const conf =
      config &&
      this.configAdapter.adaptFromModel(
        Object.assign({}, config, { status: 'danger' })
      );
    return this.toastrSvc.danger(message, title, conf);
  }

  default(
    message: string,
    title?: string,
    config?: Partial<ToasterConfigExt>
  ): IAnyObject {
    const conf =
      config &&
      this.configAdapter.adaptFromModel(
        Object.assign({}, config, { status: 'basic' })
      );
    return this.toastrSvc.default(message, title, conf);
  }
}
