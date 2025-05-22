import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule } from '@nebular/theme';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'breadcrumbs-demo',
  standalone: true,
  imports: [CommonModule, NbCardModule, BreadcrumbsComponent, RouterModule],
  templateUrl: './breadcrumbs-demo.component.html',
  styleUrls: ['./breadcrumbs-demo.component.scss']
})
export class BreadcrumbsDemoComponent {} 