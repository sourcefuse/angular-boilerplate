import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IntroductionComponent} from './introduction.component';
import {BreadCrumbIntroductionComponent} from '../bread-crumb-introduction/bread-crumb-introduction.component';

const routes: Routes = [
  {
    path: '',
    component: IntroductionComponent,
  },
  {
    path: 'breadcrumb',
    component: BreadCrumbIntroductionComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroductionRoutingModule {}
