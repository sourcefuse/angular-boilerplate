import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {UserComponent} from '@project-lib/components/breadcrumb/breadcrumb-demo/user/user.component';
import {UserResolver} from '@project-lib/components/breadcrumb/breadcrumb-demo/user/user.resolver';
import {UserTitleComponent} from '@project-lib/components/breadcrumb/breadcrumb-demo/user-title/user-title.component';
import {TitleResolver} from '@project-lib/components/breadcrumb/breadcrumb-demo/user-title/user-title.resolver';

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
        resolve: {user: UserResolver},
        data: {
          breadcrumb: (data: any, params: any) =>
            data.user?.name ?? `User #${params.get('id')}`,
        },
        children: [
          {
            path: 'document/:id',
            component: UserTitleComponent,
            resolve: {document: TitleResolver},
            data: {
              breadcrumb: (data: any, params: any) =>
                data.document?.title ?? `Document #${params.get('id')}`,
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
