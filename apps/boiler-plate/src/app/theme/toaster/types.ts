import {
  NbGlobalLogicalPosition,
  NbGlobalPhysicalPosition,
} from '@nebular/theme';
import {ToasterConfig} from '../../core/toaster/types';

export class ToasterConfigExt extends ToasterConfig {
  override position!: NbGlobalLogicalPosition | NbGlobalPhysicalPosition;
}
