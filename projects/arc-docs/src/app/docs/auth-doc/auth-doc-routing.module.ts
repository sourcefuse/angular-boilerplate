import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocIntrodutionComponent} from './components/doc-introdution/doc-introdution.component';
import {InstallationDocComponent} from './components/installation-doc/installation-doc.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'authDocIntro',
    pathMatch: 'full',
  },
  {
    path: 'authDocIntro',
    component: DocIntrodutionComponent,
  },
  {
    path: 'installation',
    component: InstallationDocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthDocRoutingModule {}
