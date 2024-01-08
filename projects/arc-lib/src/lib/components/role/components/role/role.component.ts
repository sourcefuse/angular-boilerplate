import {Location} from '@angular/common';
import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RouteComponentBaseDirective} from '@project-lib/core/route-component-base';
import {Role} from '../../models';
import {RoleFacadeService} from '../../role-facade.service';
import {UserSessionStoreService} from '@project-lib/core/index';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'careconnect-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent extends RouteComponentBaseDirective {
  roles: MatTableDataSource<Role>;
  displayedColumns = ['name', 'createdOn', 'action'];

  constructor(
    protected override readonly location: Location,
    protected override readonly route: ActivatedRoute,
    private readonly roleFacade: RoleFacadeService,
    private readonly store: UserSessionStoreService,
    private readonly router: Router,
  ) {
    super(route, location);
  }

  ngOnInit(): void {
    this.getRoles();
  }

  getRoles() {
    this.roles = new MatTableDataSource();
    this.roles.data = [
      {
        name: 'Admin',
        createdOn: '2023-10-27 07:49:14.844+00',
        id: 'jher',
        tenantId: 'hgvcyug',
        description: 'jhvguryew',
      },
    ];
    // this.roleFacade.getRoles(this.store.getUser().tenant.id).subscribe(res => {
    //   this.roles = new MatTableDataSource();
    //   this.roles.data = res;
    //   this.roles.data = [
    //     {
    //       name: 'Admin',
    //       createdOn: '2023-10-27 07:49:14.844+00',
    //       id: 'jher',
    //       tenantId: 'hgvcyug',
    //       description: 'jhvguryew',
    //     },
    //   ];
    // });
  }

  editRole(id: string) {
    this.router.navigate([`./edit/${id}`], {
      relativeTo: this.route,
    });
  }

  deleteRole(id: string) {}
}
