import {Component, Input, isDevMode, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Breadcrumb} from './breadcrumb.interface';
import {BreadcrumbService} from './breadcrumb.service';
import {Observable, Subject, takeUntil} from 'rxjs';
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

  @Input() staticBreadcrumbs = [];
  @Input() separator = '>';
  @Input() maxItems = 8;
  @Input() separatorClass = 'separator';
  @Input() itemClass = 'breadcrumb-item';

  expanded = false;
  private destroy$ = new Subject<void>();
  constructor(private readonly breadcrumbService: BreadcrumbService) {}
  ngOnInit(): void {
    this.breadcrumbs$.pipe(takeUntil(this.destroy$)).subscribe(breadcrumbs => {
      if (isDevMode()) {
        console.log('Breadcrumbs:', breadcrumbs);
      }
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
