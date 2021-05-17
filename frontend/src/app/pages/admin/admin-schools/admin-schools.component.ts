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
  menus : Menu[];
  municipalities : Municipality[];
  subscriptions : Subscription[] = [];



  constructor(private municipalityService : MunicipalityService, private menuService: MenuService) {

 
   }

  ngOnInit(): void {
    this.municipalityService.getMunicipalities().subscribe((municipalities : Municipality[]) => {
      this.municipalities = municipalities;
    })
    this.menuService.getMenus().subscribe((menus : Menu[]) => {
      this.menus = menus;
    })

  }




}
