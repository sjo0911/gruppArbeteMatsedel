import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { Municipality } from 'src/app/models/municipality';
import { School } from 'src/app/models/school';
import { Week } from 'src/app/models/week';
import { DateHandlerService } from 'src/app/services/date-handler.service';
import { MenuService } from 'src/app/services/menu.service';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { SharingService } from 'src/app/services/sharing.service';
import { Subscription } from 'rxjs';

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
  subscriptions : Subscription[] = [];
  ROOT_URL : string;

  constructor(private municipalityService: MunicipalityService, private router: Router,
    private dateHandlerService : DateHandlerService, private menuService: MenuService, private sharingService : SharingService) {
    this.municipalityTitle = "Kommun";
    this.schoolTitle = "Skola";
    this.weekTitle = "Vecka"
    this.currentWeek = this.dateHandlerService.getCurrentWeek();
    this.ROOT_URL = "localhost:4200";
  }

  ngOnInit(): void {

    let sub: Subscription = this.municipalityService.getMunicipalities().subscribe((municipalities: Municipality[]) => {
      this.municipalities = municipalities;
    })
    this.subscriptions.push(sub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  chooseMunicipality(municipality: Municipality) {
    this.chosenMunicipality = municipality;
    this.municipalityTitle = this.chosenMunicipality.municipalityName;
    this.schoolTitle = "Skola";
    this.weekTitle = "Vecka";
  }

  chooseSchool(school: School) {
    this.chosenSchool = school;
    this.schoolTitle = this.chosenSchool.schoolName;
    let menu : Menu;

    let sub: Subscription = this.menuService.getMenu(this.chosenSchool._menuId).subscribe((menuu: Menu) => {
      menu = menuu;
    },
    (err) => {

    },
    () => {
      console.log(menu);
      this.weeks = this.dateHandlerService.getWeeks(menu);
      console.log(this.weeks);
      // let currentWeek = this.dateHandlerService.getCurrentWeek();
      this.weeks.forEach(week => {
        if(week.weekNr === this.currentWeek) {
          this.chosenWeek = week;
        }
      });
     this.chooseWeek(this.chosenWeek);
    });
    this.subscriptions.push(sub);
  }

  chooseWeek(week : Week) {
    this.chosenWeek = week;
    this.weekTitle = "Vecka " + this.chosenWeek.weekNr;

    this.previousWeek = this.dateHandlerService.getPreviousWeek(this.weeks, week);
    if(this.previousWeek){
      this.previousWeekTitle = "V." + this.previousWeek.weekNr;
    } else {
      this.previousWeekTitle = "";
    }

    this.nextWeek = this.dateHandlerService.getNextWeek(this.weeks, week);

    if(this.nextWeek){
      this.nextWeekTitle = "V." + this.nextWeek.weekNr;
    } else {
      this.nextWeekTitle = "";
    }

    this.sharingService.setWeek(this.chosenWeek);
  }

  previousWeekClick(): void {
    if(this.previousWeek) {
      this.chooseWeek(this.previousWeek);
    }

  }

  nextWeekClick(): void {
    if(this.nextWeek){
      this.chooseWeek(this.nextWeek);
    }
  }

}
