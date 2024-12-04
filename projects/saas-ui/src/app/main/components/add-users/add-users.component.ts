import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {COUNTRIES} from '../../../shared/constants/countries.constant';
import {OnBoardingService} from '../../../shared/services';
import {ROLES} from '../../../shared/constants/roles.constant';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent {
  addUserForm: FormGroup;
  roleOptions = ROLES;
  idpOptions = [
    {label: 'Cognito', value: 'cognito'},
    {label: 'Auth0', value: 'auth0'},
    {label: 'KeyCloak', value: 'keycloak'},
  ];

  constructor(
    private route: ActivatedRoute,
    private readonly onBoardingService: OnBoardingService,
    private toastrService: NbToastrService,
    private readonly router: Router,
    private fb: FormBuilder,
  ) {
    this.addUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      idp: ['', [Validators.required]],
    });
  }

  onCancel() {
    this.router.navigate(['main/users']);
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      const userData = this.addUserForm.value;
      const user = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role,
        idp: userData.idp,
      };
      console.log(userData);
    }
  }
}
