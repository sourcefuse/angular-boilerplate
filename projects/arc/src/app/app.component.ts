import { SelectionModel } from '@angular/cdk/collections';
import {Component, Input, OnInit} from '@angular/core';
import { GanttTaskValue } from '@project-lib/components/gantt';
import {ComponentBaseDirective} from '@project-lib/core/component-base';
import {TranslationService} from '@project-lib/core/localization';
import {IconPacksManagerService} from '@project-lib/theme/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends ComponentBaseDirective implements OnInit {
  title = 'boiler-plate-ui';
  constructor(
    private readonly iconMgr: IconPacksManagerService,
    private readonly languageTranslateService: TranslationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.languageTranslateService.init();
    this.iconMgr.registerFontAwesome();
    this.iconMgr.registerSvgs();
  }

//   groupConfig=[];
//   selectedOptions=new SelectionModel();
//   showIcon=true;
//   options=[{
//     name:"tia",
//   }]
//    mockItem:GanttTaskValue<any>={
//     id: "1",
//     start_date: new Date(),
//     end_date: new Date(),
//     name: "Tia",
//     subtitle: "abvh",
   
//     type: 0,
  
//     hasChildren: true,
//     isParent: false,
//     payload: {},
//     subAllocations:[],

//    }
//   yourOptionsArray: any[] = [
//     { id: 1, name: 'Option 1' },
//     { id: 2, name: 'Option 2' },
//     // Add more options as needed
//   ];
//   selectedValue: any; // For single select
//   // selectedValues: any[] = []; // For multiple select

//   onValueChange(newValue: any) {
//     // Handle the new selected value here
//     this.selectedValue = newValue;
//     // For multiple select:
//     // this.selectedValues = newValue;
//   }

//   onToggle(item: any) {
//     // Handle item selection or deselection
//   }
  
//   onRemove(item: any) {
//     // Handle item removal
//   }
//   @Input() desc!: boolean;
//   @Input() name?: string;
//   @Input() searchPlaceholder = 'Enter your search here';
//   @Input() showSearch!: boolean;
  
 }
