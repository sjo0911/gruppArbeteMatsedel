import { Menu } from './../../../../models/menu';
import { MunicipalityService } from './../../../../services/municipality.service';
import { MenuService } from './../../../../services/menu.service';
import { School } from './../../../../models/school';
import { Municipality } from './../../../../models/municipality';
import { Component, OnInit, Input } from '@angular/core';
import { Alert } from 'src/assets/alert';

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

  constructor(private menuService: MenuService, private municipalityService : MunicipalityService, private alert : Alert) {
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
    this.menuService.getMenuName(school._menuId).subscribe((menuToDelete: Menu) => {
        this.menuToDelete = menuToDelete.menuName;
      });
  }

  deleteMenuFromSchool(school: School) {
    if(this.chosenSchoolTitleToDelete === "Välj skola: ") {
      this.alert.showAlert('', 'Du måste välja en skola att ta bort matsedeln från!', 'warning');
    } else if (school._menuId === '') {
      this.alert.showAlert('', 'Den valda skolan har ingen matsedel att ta bort!', 'warning');
    } else {
      school._menuId = '';
      this.municipalityService.updateSchool(this.municipalityToDelete._id, school).subscribe(() => {});
      this.alert.showAlertAndUpdatePage('Borttagen!', 'Matsedeln har blivit borttagen från den valda skolan.', 'success');
    }
  }
}
