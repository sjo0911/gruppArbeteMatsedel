import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { Municipality } from 'src/app/models/municipality';
import { School } from 'src/app/models/school';
import { MenuService } from 'src/app/services/menu.service';
import { MunicipalityService } from 'src/app/services/municipality.service';

@Component({
  selector: 'app-admin-schools',
  templateUrl: './admin-schools.component.html',
  styleUrls: ['./admin-schools.component.scss']
})
export class AdminSchoolsComponent implements OnInit {

  municipalities : Municipality[];
  subscriptions : Subscription[] = [];
  municipalityToAdd : Municipality = new Municipality();
  municipalityToDelete : Municipality = new Municipality();
  schoolToAdd : School = new School();
  schoolToDelete  : School = new School();
  menuToAdd : Menu = new Menu();
  menuToDelete : string;
  chosenMunicipalityTitleToAdd : string;
  chosenSchoolTitleToAdd : string;
  chosenMenuTitle : string;
  menus : Menu[];
  chosenMunicipalityTitleToDelete : string;
  chosenSchoolTitleToDelete : string;

  constructor(private municipalityService : MunicipalityService, private menuService: MenuService) {
    this.chosenMunicipalityTitleToAdd = "Välj kommun: ";
    this.chosenSchoolTitleToAdd = "Välj skola: ";
    this.chosenMenuTitle = "Välj matsedel: ";
    this.chosenMunicipalityTitleToDelete = "Välj kommun: ";
    this.chosenSchoolTitleToDelete = "Välj skola: ";
   }

  ngOnInit(): void {
    this.municipalityService.getMunicipalities().subscribe((municipalities : Municipality[]) => {
      this.municipalities = municipalities;
    })
    this.menuService.getMenus().subscribe((menus : Menu[]) => {
      this.menus = menus;
    })
  }

  chooseMunicipalityToAdd(municipality : Municipality) {
    this.municipalityToAdd = municipality;
    this.chosenMunicipalityTitleToAdd = municipality.municipalityName;
  }

  chooseSchoolToAdd(school : School) {
    this.schoolToAdd = school;
    this.chosenSchoolTitleToAdd = school.schoolName;
  }

  chooseMenuToAdd(menu : Menu) {
    this.menuToAdd = menu;
    this.chosenMenuTitle = menu.menuName;
  }

  chooseMunicipalityToDelete(municipality : Municipality) {
    this.municipalityToDelete = municipality;
    this.chosenMunicipalityTitleToDelete = municipality.municipalityName;
  }

  chooseSchoolToDelete(school : School) {
    this.schoolToDelete = school;
    this.chosenSchoolTitleToDelete = school.schoolName;
    this.menuService.getMenuName(school._menuId).subscribe((menuToDelete : Menu) => {
      this.menuToDelete = menuToDelete.menuName;
    })
  }

}
