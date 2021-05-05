import { Component, OnInit } from '@angular/core';
import { Week } from 'src/app/models/week';
import { DateHandlerService } from 'src/app/services/date-handler.service';
import { SharingService } from 'src/app/services/sharing.service';
import { Meal } from 'src/app/models/meal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  week : Week;
  noInput : string;

  constructor(private dateHandlerService : DateHandlerService, private sharingService : SharingService) {
    this.noInput = "MAT SAKNAS";
  }

  ngOnInit(): void {
      this.sharingService.getObservableWeek().subscribe((week : Week) => {
        this.week = week;
      })

  }

  getFoodSpecs(meal : Meal) : string {
    let returnString : string = '';
    meal.foodSpecs.forEach(foodSpec => {
      if(foodSpec === 'vego') {
        returnString += `<i class="fas vego fa-seedling"></i>`;
      } else if(foodSpec === 'gurka') {
        returnString += `<i class="fas gurka fa-pepper-hot"></i>`;
      } else if(foodSpec === 'pig') {
        returnString += `<i class="fas pig fa-bacon"></i>`;
      }
      returnString += '&nbsp&nbsp';
    });
    return returnString;
  }





}
