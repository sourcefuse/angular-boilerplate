import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BackendIntegrationDocComponent} from './components/backend-integration-doc/backend-integration-doc.component';
import {CloneBoilerplateDocComponent} from './components/clone-boilerplate-doc/clone-boilerplate-doc.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clone',
    pathMatch: 'full',
  },
  {
    path: 'clone',
    component: CloneBoilerplateDocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuideRoutingModule {}
