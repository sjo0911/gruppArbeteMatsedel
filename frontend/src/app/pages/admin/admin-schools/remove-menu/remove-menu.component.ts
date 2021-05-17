import { Menu } from './../../../../models/menu';
import { MunicipalityService } from './../../../../services/municipality.service';
import { MenuService } from './../../../../services/menu.service';
import { School } from './../../../../models/school';
import { Municipality } from './../../../../models/municipality';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-remove-menu',
  templateUrl: './remove-menu.component.html',
  styleUrls: ['./remove-menu.component.scss'],
})
export class RemoveMenuComponent implements OnInit {
  @Input() municipalities: Municipality[];

  municipalityToDelete: Municipality = new Municipality();

  schoolToDelete: School = new School();

  menuToDelete: string;

  chosenMunicipalityTitleToDelete: string;
  chosenSchoolTitleToDelete: string;

  constructor(private menuService: MenuService, private municipalityService : MunicipalityService) {
    this.chosenMunicipalityTitleToDelete = "Välj kommun: ";
    this.chosenSchoolTitleToDelete = "Välj skola: ";
  }
  ngOnInit(): void {}

  chooseMunicipalityToDelete(municipality: Municipality) {
    this.municipalityToDelete = municipality;
    this.chosenMunicipalityTitleToDelete = municipality.municipalityName;
  }

  chooseSchoolToDelete(school: School) {
    this.schoolToDelete = school;
    this.chosenSchoolTitleToDelete = school.schoolName;
    this.menuService
      .getMenuName(school._menuId)
      .subscribe((menuToDelete: Menu) => {
        this.menuToDelete = menuToDelete.menuName;
      });
  }

  deleteMenuFromSchool(school: School) {
    school._menuId = '';
    this.municipalityService
      .updateSchool(this.municipalityToDelete._id, school)
      .subscribe(() => {});
  }
}
