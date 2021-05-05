import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { Week } from 'src/app/models/week';
import { DateHandlerService } from 'src/app/services/date-handler.service';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  week : Week;

  constructor(private dateHandlerService : DateHandlerService, private sharingService : SharingService) { }

  ngOnInit(): void {
    this.sharingService.getObservable().subscribe((week : Week) => {
      this.week = week;
    })
  }

  getFoodSpecs(meal : Meal) : string {
    let returnString : string = '';
    meal.foodSpecs.forEach(foodSpec => {
      if(foodSpec === 'vego') {
        returnString += `<i class="fas fa-seedling"></i>`;
      } else if(foodSpec === 'gurka') {
        returnString += `<i class="fas fa-pepper-hot"></i>`;
      } else if(foodSpec === 'pig') {
        returnString += `<i class="fas fa-bacon"></i>`;
      }
      returnString += '&nbsp&nbsp';
    });
    return returnString;
  }

}
