import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddTenantComponent} from './add-tenant.component';

const routes: Routes = [
  {
    path: '',
    component: AddTenantComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTenantRoutingModule {}
