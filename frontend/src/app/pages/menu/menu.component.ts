import { AuthService } from '@auth0/auth0-angular';
import { Subscription } from 'rxjs';
import { Component, OnInit, LOCALE_ID } from '@angular/core';
import { Week } from 'src/app/models/week';
import { DateHandlerService } from 'src/app/services/date-handler.service';
import { SharingService } from 'src/app/services/sharing.service';
import { Meal } from 'src/app/models/meal';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  week : Week;
  subscriptions : Subscription[] = [];

  constructor( private sharingService : SharingService , private auth: AuthService
    ) {
      if(auth.isAuthenticated$ ){
      }
  }

  ngOnInit(): void {
      let sub : Subscription = this.sharingService.getObservableWeek().subscribe((week : Week) => {
        this.week = week;
      });
      this.subscriptions.push(sub);

  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }




}
