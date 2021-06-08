import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { School } from 'src/app/models/school';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Alert } from 'src/assets/alert';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})

export class UpdateUserComponent implements OnInit {
  schoolsTitle : string;
  schoolsToChoose : School[];
  chosenSchools : [];
  myForm: FormGroup;
  dropdownSettings: IDropdownSettings = {};
  subscriptions : Subscription[];
  userToUpdateTitle : string;
  users : any;
  userToUpdate : User;
  checkAdmin : boolean = false;

  constructor(private municipalityService : MunicipalityService, private fb : FormBuilder, private userService : UserService, private alert : Alert) {
    this.schoolsTitle = 'Välj skolor till användare';
    this.subscriptions = [];
    this.userToUpdateTitle = 'Välj användare att uppdatera: ';

    this.userToUpdate = new User();
    this.userToUpdate.firstName = '';
    this.userToUpdate.lastName = '';
    this.userToUpdate.email = '';
    this.userToUpdate.password = '';
  }

  ngOnInit(): void {
    let sub = this.userService.getUsers().subscribe((users : any) => {
      this.users = users;
    });
    this.subscriptions.push(sub);

    let sub2 = this.municipalityService.getSchools().subscribe((schools : School[]) => {
      this.schoolsToChoose = schools;
    });
    this.subscriptions.push(sub2);

    this.dropdownSettings = {
      singleSelection: false,
      textField: 'schoolName',
      selectAllText: 'Markera alla',
      unSelectAllText: 'Avmarkera alla',
      searchPlaceholderText: 'Sök',
      itemsShowLimit: 1,
      idField: '_id',
      allowSearchFilter: true
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  chooseUserToUpdate(user) {
    this.checkAdmin = false;

    this.userToUpdate = new User();

    this.userToUpdateTitle = user.email;
    this.userToUpdate._id = user._id;
    this.userToUpdate.firstName = user.firstName;
    this.userToUpdate.lastName = user.lastName;
    this.userToUpdate.email = user.email;
    this.userToUpdate.schoolIds = user.schoolIds;
    this.userToUpdate.permissions = user.permissions;
    this.userToUpdate.menuIds = user.menuIds;
    this.userToUpdate.password = user.password;

    user.permissions.forEach(permission => {
      if(permission === 'admin') {
        this.checkAdmin = true;
      }
    });


    // Set skolorna checked
  }

  updateUser(firstName : string, lastName : string, email : string, password : string, admin : boolean, schools) {
    if(lastName.length < 1) {
      this.alert.showAlert('', 'Användare måste ha ett efternamn. Testa igen!', 'warning');
    } else if(email.length < 5) {
      this.alert.showAlert('', 'Användare måste ha en email på minst 5 tecken. Testa igen!', 'warning');
    } else if(password.length < 5) {
      this.alert.showAlert('', 'Användare måste ha ett lösenord på minst 5 tecken. Testa igen!', 'warning');
    } else {

      this.userToUpdate.setUserFromAuthPic({'firstName' : firstName, 'lastName' : lastName, 'email' : email, 'permissions' : [], 'schoolIds' : [], 'menuIds' : []});

      let schoolIds = [];
      this.userToUpdate.password = password;
      if(admin) {
        this.userToUpdate.permissions.push('admin');
      } else if(schools) {
        schools.forEach(school => {
          schoolIds.push(school.id);
        });
      }
      this.userToUpdate.schoolIds = schoolIds;
      let sub: Subscription = this.userService.updateUser(this.userToUpdate).subscribe(() => {
      })
      this.subscriptions.push(sub);
      this.alert.showAlertAndUpdatePage('Sparad!', 'Användaren har blivit sparad.', 'success');
    };
  };

}
