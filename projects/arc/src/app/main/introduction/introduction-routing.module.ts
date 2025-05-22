import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IntroductionComponent} from './introduction.component';
import { BreadcrumbsDemoComponent } from 'projects/arc-lib/src/lib/components/breadcrumbs/breadcrumbs-demo.component';

const routes: Routes = [
  {
    path: '',
    component: IntroductionComponent,
    children: [
      { path: 'breadcrumbs-demo', component: BreadcrumbsDemoComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroductionRoutingModule {}
