import {NgModule} from '@angular/core';
import type {Routes} from '@angular/router';
import {RouterModule} from '@angular/router';
import {IntroductionComponent} from './introduction.component';
import {BreadcrumbsDemoComponent} from 'projects/arc-lib/src/lib/components/breadcrumbs/breadcrumbs-demo.component';
import {Component} from '@angular/core';
import {UserResolver} from './resolvers/user.resolver';
import {NoteResolver} from './resolvers/note.resolver';

@Component({
  standalone: true,
  template: '<p>User/Note Details Placeholder</p>',
})
class BreadcrumbsDemoDetailComponent {}

const routes: Routes = [
  {
    path: '',
    component: IntroductionComponent,
    children: [
      {
        path: 'breadcrumbs-demo',
        component: BreadcrumbsDemoComponent,
        children: [
          {
            path: 'user/:userId',
            component: BreadcrumbsDemoDetailComponent,
            resolve: {user: UserResolver},
            data: {
              breadcrumb: (
                data: {user: {name: string}},
                params: {[key: string]: string},
              ) => data.user?.name || `User #${params.userId}`,
            },
            children: [
              {
                path: 'notes/:noteId',
                component: BreadcrumbsDemoDetailComponent,
                resolve: {note: NoteResolver},
                data: {
                  breadcrumb: (
                    data: {note: {title: string}},
                    params: {[key: string]: string},
                  ) => data.note?.title || `Note #${params.noteId}`,
                },
              },
            ],
          },
        ],
      },
      {
        path: 'user/:userId',
        component: BreadcrumbsDemoDetailComponent,
        resolve: {user: UserResolver},
        data: {
          breadcrumb: (
            data: {user: {name: string}},
            params: {[key: string]: string},
          ) => data.user?.name || `User #${params.userId}`,
        },
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IntroductionRoutingModule {}
