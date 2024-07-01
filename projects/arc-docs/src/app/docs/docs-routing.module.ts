import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DocsComponent} from './docs.component';

const routes: Routes = [
  {
    path: '',
    component: DocsComponent,
    children: [
      {
        path: 'getting-started',
        loadChildren: () =>
          import('./getting-started/getting-started.module').then(
            m => m.GettingStartedModule,
          ),
      },
      {
        path: 'guide',
        loadChildren: () =>
          import('./guide/guide.module').then(m => m.GuideModule),
      },
      {
        path: 'auth-doc',
        loadChildren: () =>
          import('./auth-doc/auth-doc.module').then(m => m.AuthDocModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocsRoutingModule {}
