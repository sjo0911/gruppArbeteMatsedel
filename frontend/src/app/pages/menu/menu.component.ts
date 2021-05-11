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
  noInput : string;
  dateToday: Date;
  subscriptions : Subscription[] = [];

  constructor(private dateHandlerService : DateHandlerService, private sharingService : SharingService ,private sanitizer: DomSanitizer) {
    this.noInput = "MAT SAKNAS";
    this.dateToday = new Date(Date.now());
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

  getFoodSpecs(meal : Meal) : string {
    let returnString : string = '';
    returnString += '&nbsp&nbsp';
    meal.foodSpecs.forEach(foodSpec => {
      if(foodSpec === 'veg') {
        returnString += `<i class="fas fa-seedling" style='color:darkGreen' title="Vegetarisk"></i>`;
      } else if(foodSpec === 'hot') {
        returnString += `<i class="fas fa-pepper-hot" style='color:red' title="Stark"></i>`;
      } else if(foodSpec === 'pig') {
        returnString += `<i class="fas fa-bacon" style='color:pink' title="Fläsk"></i>`;
      }
      returnString += '&nbsp&nbsp';
    });
    return returnString;
  }


}
