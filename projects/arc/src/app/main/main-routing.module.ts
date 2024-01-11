import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {IntroductionComponent} from './introduction/introduction.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'components',
        component: IntroductionComponent,
        children: [
          {
            path: 'nebular-comp',
            loadChildren: () =>
              import('./introduction/introduction.module').then(
                m => m.IntroductionModule,
              ),
          },
          {
            path: 'arc-comp',
            loadChildren: () =>
              import('./introduction/introduction.module').then(
                m => m.IntroductionModule,
              ),
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
