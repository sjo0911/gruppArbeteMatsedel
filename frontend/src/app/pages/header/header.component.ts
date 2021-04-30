import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { Municipality } from 'src/app/models/municipality';
import { School } from 'src/app/models/school';
import { Week } from 'src/app/models/week';
import { DateHandlerService } from 'src/app/services/date-handler.service';
import { MenuService } from 'src/app/services/menu.service';
import { MunicipalityService } from 'src/app/services/municipality.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  municipalities: Municipality[];
  chosenMunicipality: Municipality;
  municipalityTitle: string;
  chosenSchool: School;
  schoolTitle: string;
  weeks : Week[];
  weekTitle : string;
  chosenWeek : Week;
  previousWeek : Week;
  nextWeek : Week;
  previousWeekTitle : string;
  nextWeekTitle : string;
  currentWeek : string;

  ROOT_URL : string;

  constructor(private municipalityService: MunicipalityService, private router: Router,
    private dateHandlerService : DateHandlerService, private menuService: MenuService) {
    this.municipalityTitle = "Kommun";
    this.schoolTitle = "Skola";
    this.weekTitle = "Vecka"
    this.currentWeek = this.dateHandlerService.getCurrentWeek();
    this.ROOT_URL = "localhost:4200";
  }

  ngOnInit(): void {

    this.municipalityService.getMunicipalities().subscribe((municipalities: Municipality[]) => {
      this.municipalities = municipalities;
    })
  }

  ngOnDestroy() {

  }

//   routingPrevious(){
//     this.router.navigate(`['/menu/${this.chosenSchool._menuId}']`);
//  }

//   routingNext(){
//     this.router.navigate("['/hero']");
//  }

  chooseMunicipality(municipality: Municipality) {
    this.chosenMunicipality = municipality;
    this.municipalityTitle = this.chosenMunicipality.municipalityName;
    this.schoolTitle = "Skola";
    this.weekTitle = "Vecka";
  }

  chooseSchool(school: School) {
    this.chosenSchool = school;
    this.schoolTitle = this.chosenSchool.schoolName;
    this.menuService.getMenu(this.chosenSchool._menuId).subscribe((menu: Menu) => {
      this.weeks = this.dateHandlerService.getWeeks(menu.startDate, menu.endDate);

      // let currentWeek = this.dateHandlerService.getCurrentWeek();
      this.weeks.forEach(week => {
        if(week.weekNr === this.currentWeek) {
          this.chosenWeek = week;
        }
      });
      this.weekTitle = "Vecka " + this.chosenWeek.weekNr;

      // Från html:
      // routerLink="/menu/{{school._menuId}}/week/{{currentWeek}}"
      this.router.navigateByUrl(`${this.ROOT_URL}/menu/${school._menuId}/week/${this.currentWeek}`);

      // console.log(this.chosenWeek.weekNr);
      // this.previousWeek = this.dateHandlerService.getPreviousWeek(this.weeks, this.chosenWeek);
      // console.log(this.previousWeek.weekNr);
      // this.previousWeekTitle = "V." + this.previousWeek.weekNr;
      // this.nextWeek = this.dateHandlerService.getNextWeek(this.weeks, this.chosenWeek);
      // this.nextWeekTitle = "V." + this.nextWeek.weekNr;
    });

  }

  chooseWeek(week : Week) {
    this.chosenWeek = week;
    this.weekTitle = "Vecka " + this.chosenWeek.weekNr;

    this.previousWeek = this.dateHandlerService.getPreviousWeek(this.weeks, week);
    this.previousWeekTitle = "V." + this.previousWeek.weekNr;
    this.nextWeek = this.dateHandlerService.getNextWeek(this.weeks, week);
    this.nextWeekTitle = "V." + this.nextWeek.weekNr;

    // Från html:
    // routerLink="/menu/{{chosenSchool._menuId}}/week/{{week.weekNr}}"
    this.router.navigateByUrl(`${this.ROOT_URL}/menu/${this.chosenSchool._menuId}/week/${week.weekNr}`);
  }

}
