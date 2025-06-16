import {CommonModule} from '@angular/common';
import {Component, NgModule} from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'arc-bread-crumb-introduction',
  templateUrl: './bread-crumb-introduction.component.html',
  styleUrls: ['./bread-crumb-introduction.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class BreadCrumbIntroductionComponent {
  expanded = false;
  constructor(private readonly router: Router) {}
  basicCode = `  
    <app-breadcrumb
        [staticBreadcrumbs]="[
          {label: 'Home', url: '/home'},
          {label: 'Components', url: '/components'},
          {label: 'Arc Components', url: '/components/arc-comp'}]">
    </app-breadcrumb>`;
  routingCode = `
      {
        path: 'user/:id',
        component: UserComponent,
        data: {
          asyncBreadcrumb: {
            service: UserService,
            method: 'getUserNameForBreadcrumb',
            fallbackLabel: (params: ParamMap) => \`User #\${params.get('id')}\`,
            loadingLabel: 'Loading user...',
          },
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
                  \`Document #\${params.get('id')}\`,
                loadingLabel: 'Loading document...',
              },
            },
          },
        ],
      },
  `;
  asyncLogicCode = `
    const asyncConfig = data?.asyncBreadcrumb;
    if (asyncConfig?.service && asyncConfig?.method) {
      const params = route.paramMap;
      const paramValue = params.get('id');
      const fallback =
        asyncConfig.fallbackLabel?.(params) || this._toTitleCase(path);
      const loadingLabel = asyncConfig.loadingLabel || fallback;

      setTimeout(async () => {
        try {
          const serviceInstance = this.injector.get(asyncConfig.service);
          const result$ = serviceInstance[asyncConfig.method](paramValue);
          const result = await result$.toPromise();
          this.updateBreadcrumbLabel(currentUrl, result);
        } catch (error) {
          console.warn('Async breadcrumb load failed:', error);
        }
      }, 0);

      return loadingLabel;
    }
  `;
  serviceCode = `
  getUserById(id: string): Observable<UserDetails> {
      const user = this.users.find(u => u.id === id);
      return of(user);
    }
    getUserNameForBreadcrumb(id: string): Observable<string> {
      return this.getUserById(id).pipe(
        map(user => user?.name || \`User #\${id}\`),
        catchError(() => of(\`User #\${id}\`)),
      );
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
