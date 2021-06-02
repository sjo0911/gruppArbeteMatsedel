export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  schoolIds: string[];
	permissions: string[];
  menuId: string[];

  constructor(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.schoolIds = user.schoolIds;
    this.permissions = user.permissions;
    this.menuId = user.menuId;
  }
}
