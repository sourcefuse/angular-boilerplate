import {NgModule} from '@angular/core';
import {ParamMap, RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {UserComponent} from '@project-lib/components/breadcrumb/breadcrumb-demo/user/user.component';
import {UserTitleComponent} from '@project-lib/components/breadcrumb/breadcrumb-demo/user-title/user-title.component';
import {UserService} from '@project-lib/components/breadcrumb/breadcrumb-demo/user/user.service';
import {TitleService} from '@project-lib/components/breadcrumb/breadcrumb-demo/user-title/user-title.service';

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
      {
        path: 'user/:id',
        component: UserComponent,
        data: {
          asyncBreadcrumb: {
            service: UserService,
            method: 'getUserNameForBreadcrumb',
            fallbackLabel: (params: ParamMap) => `User #${params.get('id')}`,
          },
          icon: 'person-outline',
        },
        children: [
          {
            path: 'document/:id',
            component: UserTitleComponent,
            data: {
              asyncBreadcrumb: {
                service: TitleService,
                method: 'getTitleNameForBreadcrumb',
                fallbackLabel: (params: ParamMap) =>
                  `Document #${params.get('id')}`,
              },
              icon: 'file-text-outline',
            },
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
