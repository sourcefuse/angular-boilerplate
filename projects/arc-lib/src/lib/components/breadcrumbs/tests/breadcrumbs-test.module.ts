import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsComponent } from '../breadcrumbs.component';
import { BreadcrumbsTestComponent } from './breadcrumbs-test.component';

@NgModule({
  imports: [CommonModule, BreadcrumbsComponent, BreadcrumbsTestComponent],
})
export class BreadcrumbsTestModule {} 