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
import { Subscription, Observable } from 'rxjs';
import  Swal  from 'sweetalert2';
import { Alert } from 'src/assets/alert';
import { User } from 'src/app/models/user';
import { AuthService } from '@auth0/auth0-angular';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  $municipalities: Observable<any>;
  chosenMunicipality: Municipality;
  municipalityTitle: string;
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
    private dateHandlerService : DateHandlerService, private menuService: MenuService, private sharingService : SharingService, private alert : Alert, private auth: AuthService) {
    this.municipalityTitle = "Kommun";
    this.schoolTitle = "Skola";
    this.weekTitle = "Vecka"
    this.currentWeek = this.dateHandlerService.getCurrentWeek();
    this.ROOT_URL = "localhost:4200";
  }

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((loggedIn) => {
      if(loggedIn) {
        this.subscriptions.push(this.auth.user$.subscribe((user) => {
          let currentUser = new User();
          currentUser.setUserFromAuthPic(user.picture);
          if(!currentUser.permissions.some((perm) => perm === 'admin')){
            //Filter out municipalities that user have access to change
            this.$municipalities = this.municipalityService.getMunicipalities().pipe(map((municipalities : Municipality[]) => {
              let mun = municipalities.filter((mun) => {
                return mun.schools.some((school) => {
                  return currentUser.schoolIds.some((schoolId) => schoolId === school._id)
                })
              })
              //Filter out schools that user have access to change
             mun.forEach((municipality) => {
                municipality.schools = municipality.schools.filter((school) => {
                  return currentUser.schoolIds.some((schoolId) => schoolId === school._id);
                })
              })
              return mun;
            }))
          } else {
            this.$municipalities = this.municipalityService.getMunicipalities();
          }
        }))
      } else {
        this.$municipalities = this.municipalityService.getMunicipalities();
      }
    })
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  chooseMunicipality(municipality: Municipality) {
    console.log(municipality);
    this.chosenMunicipality = municipality;
    this.municipalityTitle = this.chosenMunicipality.municipalityName;
    this.schoolTitle = "Skola";
    this.weekTitle = "Vecka";
  }

  chooseSchool(school: School) {
    if(school._menuId === '') {
      this.alert.showAlert('', 'Vald skola har ingen matsedel!', 'error');
    } else {
      this.schoolTitle = school.schoolName;
      let menu : Menu;

      let sub: Subscription = this.menuService.getMenu(school._menuId).subscribe((menuu: Menu) => {
        menu = menuu;
      },
      (err) => {

      },
      () => {
        this.sharingService.setMenu(menu);
        this.weeks = this.dateHandlerService.getWeeks(menu);
        // console.log(this.weeks);
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
