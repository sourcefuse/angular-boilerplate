import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import type {Subscription} from 'rxjs';
import {BreadcrumbService} from '../../core/breadcrumb.service';
import type {Breadcrumb} from '../../core/breadcrumb.service';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NbIconModule} from '@nebular/theme';

@Component({
  selector: 'lib-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterModule, NbIconModule],
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
  @Input() staticBreadcrumbs: Breadcrumb[] = [];
  @Input() separator = '/';
  @Input() maxItems = 8;
  @Input() showIcons = false;
  @Input() itemClass = '';
  @Input() activeClass = 'active';
  @Input() disabledClass = 'disabled';
  @Input() separatorClass = 'separator';

  breadcrumbs: Breadcrumb[] = [];
  private sub?: Subscription;

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnInit() {
    this.sub = this.breadcrumbService.breadcrumbs$.subscribe(bcs => {
      this.breadcrumbs = bcs?.length ? bcs : this.staticBreadcrumbs;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  get displayBreadcrumbs(): Breadcrumb[] {
    if (this.breadcrumbs.length <= this.maxItems) {
      return this.breadcrumbs;
    }
    // Collapse breadcrumbs if too many
    const start = this.breadcrumbs.slice(0, 1);
    const end = this.breadcrumbs.slice(-(this.maxItems - 2));
    return start.concat([{label: '...', url: ''}], end);
  }

  trackByFn(index: number, item: Breadcrumb) {
    return `${item.url}${item.label}`;
  }
}
