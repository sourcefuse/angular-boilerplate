import {NameId} from '../..';

export class LoggedInUserDM {
  id!: string;
  firstName = '';
  middleName?: string;
  lastName?: string;
  username!: string;
  email?: string;
  phone?: string;
  permissions!: string[];
  tenant!: NameId;
  lastLogin?: Date;
  defaultTenantId!: string;
  photo?: string;
  userTenantId?: string;
  role?: string;

  get fullName(): string {
    let fullName = this.firstName;
    if (this.middleName) {
      fullName = fullName.concat(' ').concat(this.middleName);
    }
    if (this.lastName) {
      fullName = fullName.concat(' ').concat(this.lastName);
    }
    return fullName;
  }

  constructor(data?: Partial<LoggedInUserDM>) {
    if (
      data &&
      data.id &&
      data.firstName &&
      data.username &&
      data.permissions &&
      data.tenant &&
      data.defaultTenantId
    ) {
      this.id = data.id;
      this.firstName = data.firstName;
      this.middleName = data.middleName;
      this.lastName = data.lastName;
      this.username = data.username;
      this.email = data.email;
      this.phone = data.phone;
      this.permissions = data.permissions;
      this.tenant = data.tenant;
      this.defaultTenantId = data.defaultTenantId;
      this.lastLogin = data.lastLogin;
      this.photo = data.photo;
      this.userTenantId = data.userTenantId;
      this.role = data.role;
    } else if (data) {
      throw new Error('Mandatory fields missing for LoggedInUser model');
    } else {
      // Do nothing
    }
  }
}
