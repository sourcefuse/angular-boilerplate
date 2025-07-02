import {Component, Input, isDevMode, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Breadcrumb} from './breadcrumb.interface';
import {BreadcrumbService} from './breadcrumb.service';
import {Observable, of, Subject, takeUntil} from 'rxjs';
import {RouterModule} from '@angular/router';
import {NbIconModule} from '@nebular/theme';
@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, NbIconModule],
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs$: Observable<Breadcrumb[]> = this.breadcrumbService.breadcrumbs;
  loading$: Observable<boolean> = this.breadcrumbService.loading;

  @Input() staticBreadcrumbs = [];
  @Input() separator = '>';
  @Input() maxItems = 8;
  @Input() separatorClass = 'separator';
  @Input() itemClass = 'breadcrumb-item';
  @Input() maxLabelLength = 30;
  @Input() showLoadingSkeleton = true;
  @Input() showIcons = false;

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
  getTrimmedLabel(label: string): string {
    return label.length > this.maxLabelLength
      ? label.slice(0, this.maxLabelLength).trimEnd() + '…'
      : label;
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  toggleExpand() {
    this.expanded = !this.expanded;
  }
}
