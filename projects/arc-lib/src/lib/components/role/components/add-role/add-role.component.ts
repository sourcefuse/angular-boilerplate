import {Component} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCheckboxChange} from '@angular/material/checkbox';
import {indexOf} from 'lodash';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {RoleFacadeService} from '../../role-facade.service';
import {UserSessionStoreService} from '@project-lib/core/store';
import {FeatureAction, Role} from '../../models';
import {takeUntil} from 'rxjs';

@Component({
  selector: 'careconnect-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
})
export class AddRoleComponent extends RouteComponentBaseDirective {
  role = new Role();
  featureActions: FeatureAction[] = [];
  roleId = this.getRouteParam('id') ?? '';
  actions: {action: string; id: string; key: string; enabled: boolean}[] = [];
  constructor(
    public dialog: MatDialog,
    protected override readonly location: Location,
    protected override readonly route: ActivatedRoute,
    private readonly store: UserSessionStoreService,
    private readonly roleFacade: RoleFacadeService,
    private readonly router: Router,
  ) {
    super(route, location);
  }

  ngOnInit() {
    this.getFeatureActions();
    if (this.roleId) {
      this.getRoleById();
    }
  }

  getRoleById() {
    this.roleFacade
      .getRoleById(this.roleId, this.store.getUser().id)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        this.role = res;
        this.mapActions();
      });
  }

  mapActions() {
    this.featureActions.forEach(ele => {
      let count = 0;
      ele.actions.forEach(action => {
        if (this.role.actions.includes(action.key)) {
          action.enabled = true;
          count++;
        } else {
          action.enabled = false;
        }
      });
      if (count && count === ele.actions.length) {
        ele.enabled = true;
      }
    });
  }

  getFeatureActions() {
    this.roleFacade
      .getFeatureActions(this.store.getUser().tenant.id)
      .pipe(takeUntil(this._destroy$))
      .subscribe(res => {
        this.featureActions = res;
      });
  }

  openDialog() {
    this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '543px',
      width: '100%',
    });
  }

  actionChanged(key: string, event: MatCheckboxChange, action: FeatureAction) {
    if (event.checked) {
      this.role.actions.push(key);
    } else {
      this.role.actions.splice(indexOf(this.role.actions, key), 1);
      action.enabled = false;
    }
    this.role.actions = [...new Set(this.role.actions)];
  }

  selectFeature(feature: FeatureAction, event: MatCheckboxChange) {
    if (event.checked) {
      this.role.actions = this.role.actions.concat(
        ...feature.actions.map(ele => ele.key),
      );
    } else {
      feature.actions.forEach(ele => {
        this.role.actions.splice(indexOf(this.role.actions, ele.key), 1);
      });
    }
    this.role.actions = [...new Set(this.role.actions)];
    this.mapActions();
  }

  createRole() {
    this.role.tenantId = this.store.getUser()?.tenant?.id;
    if (this.roleId) {
      this.roleFacade
        .editRole(this.role, this.store.getUser()?.tenant?.id)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() =>
          this.router.navigate(['../../'], {relativeTo: this.route}),
        );
    } else {
      this.roleFacade
        .createRole(this.role, this.store.getUser()?.tenant?.id)
        .pipe(takeUntil(this._destroy$))
        .subscribe(() =>
          this.router.navigate(['../'], {relativeTo: this.route}),
        );
    }
  }
}
