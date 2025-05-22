import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbCardModule, NbIconModule} from '@nebular/theme';
import {BreadcrumbsComponent} from './breadcrumbs.component';
import {RouterModule, Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'breadcrumbs-demo',
  standalone: true,
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    BreadcrumbsComponent,
    RouterModule,
  ],
  templateUrl: './breadcrumbs-demo.component.html',
  styleUrls: ['./breadcrumbs-demo.component.scss'],
})
export class BreadcrumbsDemoComponent {
  staticCode = `<lib-breadcrumbs
  [staticBreadcrumbs]="[...your items...]"
  separator=">"
  [showIcons]="true"
  [maxItems]="5"
  itemClass="custom-breadcrumb-item"
  activeClass="custom-active"
  disabledClass="custom-disabled"
  separatorClass="custom-separator"
  aria-label="breadcrumb"
></lib-breadcrumbs>`;

  dynamicCode = `// In your routing module
{
  path: 'user/:userId',
  resolve: { user: UserResolver },
  data: {
    breadcrumb: (data, params) => data.user?.name || \`User #\${params.userId}\`
  },
  children: [
    {
      path: 'notes/:noteId',
      resolve: { note: NoteResolver },
      data: {
        breadcrumb: (data, params) => data.note?.title || \`Note #\${params.noteId}\`
      },
      component: NoteDetailComponent
    }
  ]
}

// In your template
<lib-breadcrumbs aria-label="breadcrumb"></lib-breadcrumbs>`;

  currentPath = '';
  resolvedUser: any = null;
  resolvedNote: any = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
      this.updateResolvedData();
    });
    this.currentPath = this.router.url;
    this.updateResolvedData();
  }

  updateResolvedData() {
    let snapshot = this.route.snapshot;
    // Traverse to the deepest child
    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
    }
    this.resolvedUser = snapshot.data['user'] || null;
    this.resolvedNote = snapshot.data['note'] || null;
  }

  getUserId(): string | null {
    let snapshot = this.route.snapshot;
    while (snapshot.firstChild) {
      snapshot = snapshot.firstChild;
    }
    return snapshot.paramMap.get('userId');
  }

  copy(code: string) {
    navigator.clipboard.writeText(code);
  }
}
