import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Municipality } from 'src/app/models/municipality';
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

  constructor(private municipalityService : MunicipalityService, private menuService: MenuService) {

   }

  ngOnInit(): void {
    this.municipalityService.getMunicipalities().subscribe((municipalities : Municipality[]) => {
      this.municipalities = municipalities;
    })

  }

  chooseMunicipalityToAdd(municipality : Municipality) {
    console.log("hej");
    this.municipalityToAdd = municipality;
  }

}
