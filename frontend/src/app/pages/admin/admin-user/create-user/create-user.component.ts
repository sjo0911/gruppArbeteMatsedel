import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from 'src/app/models/school';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  schoolsTitle : string;
  schoolsToChoose : School[];
  chosenSchools : [];
  myForm: FormGroup;
  dropdownSettings: IDropdownSettings = {};


  constructor(private municipalityService : MunicipalityService, private fb : FormBuilder, private userService : UserService) {
    this.schoolsTitle = 'Välj skolor till användare';
  }

  ngOnInit(): void {
    this.municipalityService.getSchools().subscribe((schools : School[]) => {
      this.schoolsToChoose = schools;
    })
    // this.myForm = this.fb.group({
    //   school: [this.chosenSchools]
    // });
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

  onItemSelect(school : any) {

  }

  createUser(firstName : string, lastName : string, email : string, password : string, admin : boolean, schools) {
    let newUser = new User({'firstName' : firstName, 'lastName' : lastName, 'email' : email, 'permissions' : [], 'schoolIds' : [], 'menuIds' : []});
    let schoolIds = [];
    newUser.password = password;
    if(admin) {
      newUser.permissions.push('admin');
    } else if(schools) {
      schools.forEach(school => {
        schoolIds.push(school.id);
      });
    }
    newUser.schoolIds = schoolIds;
    this.userService.postUser(newUser).subscribe(() => {
    })
  }

}
