import {Component, Inject, OnDestroy} from '@angular/core';
import {ComponentBaseDirective} from '@boiler/core/component-base';
import {NbMenuItem, NbMenuService} from '@nebular/theme';
import {AgRendererComponent} from 'ag-grid-angular';
import {filter, Subscription, takeUntil} from 'rxjs';
import {CELL_PARENT} from './const';
import {IActionCellParams, ICellAction, IGridPageActionHandler} from './types';

@Component({
  selector: 'boiler-action-kebab-render',
  templateUrl: './action-kebab-render.component.html',
  styleUrls: ['./action-kebab-render.component.scss'],
})
export class ActionKebabRenderComponent<T extends object>
  extends ComponentBaseDirective
  implements AgRendererComponent, OnDestroy
{
  private subscription!: Subscription;
  constructor(
    @Inject(CELL_PARENT)
    private parent: IGridPageActionHandler<T>,
    private menuService: NbMenuService,
  ) {
    super();
  }

  buttons: NbMenuItem[] = [];
  // sonarignore:start
  data: T | any;
  // sonarignore:end
  tag!: string;
  row!: string;

  agInit(params: Partial<IActionCellParams>): void {
    if (params.actions) {
      this.buttons = this._prepareActions(params);
    } else {
      this.buttons = [];
    }
    if (params.data) {
      this.data = params.data;
      this.tag = params.data.id;
    }
    this.subscription = this.menuService
      .onItemClick()
      .pipe(
        filter(x => x.tag == this.data.id),
        takeUntil(this._destroy$),
      )
      .subscribe(x => this.parent.handleGridAction(x.item.data, this.data));
  }

  refresh(params: IActionCellParams) {
    if (params.data) {
      this.data = params.data;
      this.tag = params.data.id;
    }
    return false;
  }

  handleClick(button: ICellAction) {
    this.parent.handleGridAction(button.data, this.data);
  }

  private _prepareActions(params: Partial<IActionCellParams>) {
    if (params.menuItemMapper && params.actions) {
      return params.menuItemMapper(params.data, params.actions);
    }
    return params.actions ?? [];
  }
}
