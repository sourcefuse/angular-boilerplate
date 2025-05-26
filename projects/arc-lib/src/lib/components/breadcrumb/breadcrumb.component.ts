import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Breadcrumb} from './breadcrump.interface';
import {BreadcrumbService} from './breadcrump.service';
import {Observable} from 'rxjs';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule],
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]> = this.breadcrumbService.breadcrumbs;
  expanded = false;
  constructor(private readonly breadcrumbService: BreadcrumbService) {}
  ngOnInit(): void {
    this.breadcrumbs$.subscribe(breadcrumbs => {
      console.log('Breadcrumbs:', breadcrumbs);
    });
  }
  toggleExpand() {
    this.expanded = true;
  }
}
