import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NbIconModule } from '@nebular/theme';

export interface Breadcrumb {
  label: string;
  url: string;
  icon?: string;
  disabled?: boolean;
  customClass?: string;
}

@Component({
  selector: 'lib-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule, NbIconModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() staticBreadcrumbs = [];
  @Input() separator = '/';
  @Input() maxItems = 8;
  @Input() showIcons = false;
  @Input() itemClass = '';
  @Input() activeClass = 'active';
  @Input() disabledClass = 'disabled';
  @Input() separatorClass = 'separator';

  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
    });
    this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
  }

  private buildBreadcrumbs(route: ActivatedRoute, url = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {
    // Add static breadcrumbs first
    if (breadcrumbs.length === 0 && this.staticBreadcrumbs.length) {
      breadcrumbs = [...this.staticBreadcrumbs];
    }
    const children = route.children;
    if (children.length === 0) {
      return breadcrumbs;
    }
    for (const child of children) {
      const routeURL = child.snapshot.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url = `${url}/${routeURL}`;
      }
      const label = child.snapshot.data['breadcrumb'] || routeURL;
      if (label) {
        breadcrumbs.push({
          label,
          url,
          icon: child.snapshot.data['icon'],
          disabled: child.snapshot.data['disabled'],
          customClass: child.snapshot.data['customClass']
        });
      }
      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }
    return breadcrumbs;
  }

  get displayBreadcrumbs(): Breadcrumb[] {
    if (this.breadcrumbs.length <= this.maxItems) {
      return this.breadcrumbs;
    }
    // Collapse breadcrumbs if too many
    const start = this.breadcrumbs.slice(0, 1);
    const end = this.breadcrumbs.slice(-(this.maxItems - 2));
    return start.concat([{ label: '...', url: '', disabled: true }], end);
  }

  trackByFn(index: number, item: Breadcrumb) {
    return `${item.url}${item.label}`;
  }
} 