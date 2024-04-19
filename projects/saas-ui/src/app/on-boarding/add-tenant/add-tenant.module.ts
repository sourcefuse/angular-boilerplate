import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddTenantRoutingModule} from './add-tenant-routing.module';
import {NbRadioModule} from '@nebular/theme';

@NgModule({
  declarations: [],
  imports: [CommonModule, AddTenantRoutingModule, NbRadioModule],
})
export class AddTenantModule {}
