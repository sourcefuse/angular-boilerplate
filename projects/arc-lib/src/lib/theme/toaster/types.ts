import {ToasterConfig} from '@project-lib/core/toaster';
import {
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';

export class ToasterConfigExt extends ToasterConfig {
  override position!: NbGlobalLogicalPosition | NbGlobalPhysicalPosition;
}
