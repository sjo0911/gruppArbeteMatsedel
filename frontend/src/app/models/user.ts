export class User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  schoolIds: any[];
	permissions: string[];
  menuIds: any[];
  password: string;

  constructor() {

  }

  setUserFromAuthPic(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.schoolIds = user.schoolIds;
    this.permissions = user.permissions;
    this.menuIds = user.menuId;
  }

}
