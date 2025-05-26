import {Component} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'arc-bread-crumb-introduction',
  templateUrl: './bread-crumb-introduction.component.html',
  styleUrls: ['./bread-crumb-introduction.component.scss'],
})
export class BreadCrumbIntroductionComponent {
  expanded = false;
  constructor(private readonly router: Router) {}
  basicCode = `  
   <ng-container *ngFor="let breadcrumb of breadcrumbs; let last = last">
        <li class="breadcrumb-item" [class.active]="last">
          <ng-container *ngIf="!breadcrumb.skipLink && !last; else noLink">
            <a [routerLink]="breadcrumb.url">{{ breadcrumb.label }}</a>
          </ng-container>
          <ng-template #noLink>
            <span>{{ breadcrumb.label }}</span>
          </ng-template>
        </li>
        <span *ngIf="!last" class="separator">›</span>
      </ng-container>`;
  routingCode = `
{
  path: 'user/:id',
  component: UserComponent,
  resolve: { user: UserResolver },
  data: {
    breadcrumb: (data: any, params: any) =>
      data.user?.name ?? \`User #\${params.get('id')}\`
  },
  children: [
    {
      path: 'document/:id',
      component: UserTitleComponent,
      resolve: { document: TitleResolver },
      data: {
        breadcrumb: (data: any, params: any) =>
          data.document?.title ?? \`Document #\${params.get('id')}\`
      }
    }
  ]
}
  `;
  resolverCode = `
resolve(route: ActivatedRouteSnapshot): Observable<any> {
  const id = route.paramMap.get('id');
  return this.userService.getUserById(id);
}
  `;
  serviceCode = `private readonly users = [
      { id: '123', name: 'John Doe', email: 'john.doe123@example.com' },
      { id: '124', name: 'Jane Smith', email: 'jane.smith124@example.com' }
    ];
  
    getUserById(id: string): Observable<any> {
      const user = this.users.find(u => u.id === id);
      return of(user);
    }`;

  copyCode(text: string) {
    navigator.clipboard.writeText(text);
  }
  goToUser(userId: number) {
    this.router.navigate(['/main/user', userId]);
  }
  goToDocument(userId: number, documentId: number) {
    this.router.navigate(['/main/user', userId, 'document', documentId]);
  }
}
