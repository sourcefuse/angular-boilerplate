import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocIntrodutionComponent} from './components/doc-introdution/doc-introdution.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthDocRoutingModule {}
