import {InjectionToken, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleComponent} from './components/role/role.component';
import {RoleRoutingModule} from './role-routing.module';
import {AddRoleComponent} from './components/add-role/add-role.component';
import {ConfirmationDialogComponent} from './components/confirmation-dialog/confirmation-dialog.component';
import {RoleAdapterService} from './adapters/role-adapter.service';
import {ThemeModule} from '@project-lib/theme/theme.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {RoleFacadeService} from './role-facade.service';
import {CdkTableModule} from '@angular/cdk/table';
import {RoleApiConfig} from './models/api-config.interface';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';

export const ROLE_API_ENDPOINT = new InjectionToken<RoleApiConfig>(
  'Role API endpoint',
);

@NgModule({
  declarations: [AddRoleComponent, ConfirmationDialogComponent, RoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
    ThemeModule,
    MatDialogModule,
    CdkTableModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatExpansionModule,
  ],
  providers: [RoleAdapterService, RoleFacadeService],
})
export class RoleModule {}
