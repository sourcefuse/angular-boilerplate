import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {IntroductionComponent} from './introduction/introduction.component';
import {ComponentDetailsComponent} from '@project-lib/components/Details/components/component-details/component-details.component';

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
        path: 'gantt',
        loadChildren: () =>
          import(
            '../../../../arc-lib/src/lib/components/gantt/gantt.module'
          ).then(m => m.GanttModule),
      },
      {
        path: 'select',
        loadChildren: () =>
          import(
            '../../../../arc-lib/src/lib/components/selector/select.module'
          ).then(m => m.SelectModule),
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
            // component: IntroductionComponent,
            // children: [
            //   {
            //     path: 'details',
            //     component: ComponentDetailsComponent,
            //     //   children: [
            //     //   {
            //     //        path: 'gant',
            //     //        component: Gant
            //     //  }
            //     //  ]
            //   },
            // ],
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
