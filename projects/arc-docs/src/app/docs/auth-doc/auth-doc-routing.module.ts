import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocIntrodutionComponent} from './components/doc-introdution/doc-introdution.component';
import {InstallationDocComponent} from './components/installation-doc/installation-doc.component';
import {ConfigureTokenDocComponent} from './components/configure-token-doc/configure-token-doc.component';
import {ApiConfigureDocComponent} from './components/api-configure-doc/api-configure-doc.component';
import {UiConfigureDocComponent} from './components/ui-configure-doc/ui-configure-doc.component';

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
  {
    path: 'configureToken',
    component: ConfigureTokenDocComponent,
  },
  {
    path: 'configureEnvs',
    component: ApiConfigureDocComponent,
  },
  {
    path: 'configureUI',
    component: UiConfigureDocComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthDocRoutingModule {}
