import {Component} from '@angular/core';
import {NbSidebarService} from '@nebular/theme';
import {Item, empData} from '@project-lib/components/gantt/model/item.model';

@Component({
  selector: 'arc-gantt-demo',
  templateUrl: './gantt-demo.component.html',
  styleUrls: ['./gantt-demo.component.scss'],
})
export class GanttDemoComponent {
  // data for tooltip component
  showTooltip = false;
  selectedItem: Item;

  onBarHovered(itemData: Item) {
    this.selectedItem = itemData;
    this.showTooltip = true;
  }

  onBarMouseLeave() {
    this.showTooltip = false;
  }

  itemData: Item = {
    allocatedHours: 1600,
    billingRate: 100,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    allotedDeals: [
      {name: 'Deal 1', allocatedHours: 800, status: 'approved'},
      {name: 'Deal 2', allocatedHours: 900, status: 'pending'},
    ],
  };

  allocationMap = new Map<string, boolean>([
    ['Deal 1', true],
    ['Deal 2', false],
  ]);

  // Data for GanttColumnComponent
  items: empData[] = [
    {
      name: 'john Doe ',
      subtitle: 'Manager',
      hasChildren: false,
      isParent: false,
      $open: false,
      overallocated: false,
    },
    {
      name: 'kelly',
      subtitle: 'Assistant Manager',
      hasChildren: false,
      isParent: false,
      $open: false,
      overallocated: false,
    },
    {
      name: 'Clove',
      subtitle: 'Software Developer',
      hasChildren: false,
      isParent: false,
      $open: false,
      overallocated: false,
    },
    {
      name: 'Classy',
      subtitle: 'DevOps',
      hasChildren: false,
      isParent: false,
      $open: false,
      overallocated: false,
    },
  ];
  showParentInitials = true;
  showChildInitials = true;
  showOverallocatedIcon = true;

  allocationTypes = {
    PlaceholderResource: 'PlaceholderResource',
  };

  allocationBase = 40;

  item: Item = {
    type: 'ActualResource',
    allocation: 32,
    payload: {dealStage: 'closedwon', billingRate: 100},
    classes: ['example-class'],
    subAllocations: [
      {percent: 50, allocation: 16, allocatedHours: 16, classes: ['class1']},
      {percent: 50, allocation: 16, allocatedHours: 16, classes: ['class2']},
    ],
  };

  // Data for GanttHeaderComponent
  headerDesc = true;
  headerName = 'Dynamic Project Gantt';
  headerSearchPlaceholder = 'Search your tasks';
  headerShowSearch = true;
}
