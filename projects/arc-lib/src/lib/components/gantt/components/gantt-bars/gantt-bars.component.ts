import {Component} from '@angular/core';
import {AnyObject} from '@project-lib/core/api';
import {MAX_ALLOCATION} from '@project-lib/core/constants';
import {TranslationService} from '@project-lib/core/localization';
import {TranslateService} from '@ngx-translate/core';
import {
  GanttTaskValue,
  GanttTaskValueWithSubAllocation,
  SubAllocation,
} from '../../types';
import {Router, ActivatedRoute} from '@angular/router';
import {COMPONENTS_DETAILS} from '@project-lib/components/Details/constants/details.constant';
import {NEBULAR_COMP_ITEMS} from '@main-project/boiler/main/constants/nebularComponents.constants';

@Component({
  selector: 'gantt-bars',
  templateUrl: './gantt-bars.component.html',
  styleUrls: ['./gantt-bars.component.scss'],
})
export class GanttBarsComponent<T extends AnyObject> {
  item: GanttTaskValue<T> = {
    allocation: 5,
    id: 1,
    start_date: new Date(),
    end_date: new Date(),
    name: 'robin',
    type: '',
    hasChildren: false,
    isParent: true,
    payload: {} as any,
  };
  config = {};
  allocationTypes: any = {};
  allocationBase = MAX_ALLOCATION;
  private translate: TranslateService;
  constructor(
    private translateSvc: TranslationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.translate = translateSvc.translate;
  }
  ngOnInit() {
    var abc = this.router.url.split('/');
    var x = abc[abc.length - 1];
    console.log(this.router.url);
    console.log(abc);
    console.log(x);
    this.router.events.subscribe(param => {
      // this.loadConfig();
    });
  }

  // loadConfig() {
  //   if (this.router.url.includes('arc-comp')) {
  //     this.config = COMPONENTS_DETAILS;
  //     // this.config = COMPONENTS_DETAILS['gantt-bars']
  //   } else {
  //     this.config = NEBULAR_COMP_ITEMS;
  //   }
  // }

  stringify(subAllocation: SubAllocation) {
    return JSON.stringify(subAllocation);
  }
  formatter(rate: number) {
    return `$${rate}/${this.translate.instant('hr')}`;
  }

  formatAllocation(allocation: number) {
    return `${allocation}${this.translate.instant('h/d')}`;
  }

  hasSubAllocation(
    item: GanttTaskValue<T>,
  ): item is GanttTaskValueWithSubAllocation<T> {
    return !!(item as GanttTaskValueWithSubAllocation<T>).subAllocations;
  }
}
