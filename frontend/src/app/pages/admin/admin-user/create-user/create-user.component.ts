import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { School } from 'src/app/models/school';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  schoolsTitle : string;
  $scope.schoolsToChoose : School[];
  chosenSchools : [];

  constructor(private municipalityService : MunicipalityService) {
    this.schoolsTitle = 'Välj skolor till användare';
  }

  ngOnInit(): void {
    this.municipalityService.getSchools().subscribe((schools : School[]) => {
      this.schoolsToChoose = schools;
    })
  }

}
