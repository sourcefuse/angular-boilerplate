import {Component} from '@angular/core';
import {STATIC_BREADCRUMBS} from '../breadcrumbs.example';
import {CommonModule} from '@angular/common';
import {BreadcrumbsComponent} from '../breadcrumbs.component';

@Component({
  selector: 'breadcrumbs-test',
  standalone: true,
  imports: [CommonModule, BreadcrumbsComponent],
  templateUrl: './breadcrumbs-test.component.html',
})
export class BreadcrumbsTestComponent {
  staticBreadcrumbs = STATIC_BREADCRUMBS;
  separator = '>';
  showIcons = true;
  maxItems = 5;
  itemClass = 'custom-breadcrumb-item';
  activeClass = 'custom-active';
  disabledClass = 'custom-disabled';
  separatorClass = 'custom-separator';
}
