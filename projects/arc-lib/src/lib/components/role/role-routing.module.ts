import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleComponent} from './components/role/role.component';
import {AddRoleComponent} from './components/add-role/add-role.component';

const routes: Routes = [
  {
    path: '',
    component: RoleComponent,
  },
  {
    path: 'add',
    component: AddRoleComponent,
  },
  {
    path: 'edit/:id',
    component: AddRoleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoleRoutingModule {}
