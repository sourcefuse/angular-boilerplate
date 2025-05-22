import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {IntroductionComponent} from './introduction/introduction.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    data: {breadcrumb: 'Home'},
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then(m => m.HomeModule),
        data: {breadcrumb: 'Home'},
      },
      {
        path: 'components',
        component: IntroductionComponent,
        data: {breadcrumb: 'Components'},
        children: [
          {
            path: 'nebular-comp',
            loadChildren: () =>
              import('./introduction/introduction.module').then(
                m => m.IntroductionModule,
              ),
            data: {breadcrumb: 'Nebular Components'},
          },
          {
            path: 'arc-comp',
            loadChildren: () =>
              import('./introduction/introduction.module').then(
                m => m.IntroductionModule,
              ),
            data: {breadcrumb: 'Arc Components'},
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
