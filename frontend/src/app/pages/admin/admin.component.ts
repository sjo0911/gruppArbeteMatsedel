import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { Week } from 'src/app/models/week';
import { Day } from 'src/app/models/day';
import { DateHandlerService } from 'src/app/services/date-handler.service';
import { SharingService } from 'src/app/services/sharing.service';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  week : Week;
  menu : Menu;

  constructor(private dateHandlerService : DateHandlerService, private sharingService : SharingService, private menuService : MenuService) {

   }

  ngOnInit(): void {
    this.sharingService.getObservableWeek().subscribe((week : Week) => {
      this.week = week;
    })
    this.sharingService.getObservableMenu().subscribe((menu : Menu) => {
      this.menu = menu;
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

  deleteMeal(mealId : string, day : Day) : void{
    day.meals.forEach((meal, index) => {
      if(meal._id === mealId) {
        day.meals.splice(index, 1);
      }
    });

    this.menu.meals.forEach((meal, index) => {
      if(meal._id === mealId) {
        this.menu.meals.splice(index, 1);
      }
    });
    this.menuService.updateMenu(this.menu).subscribe(() => {

    },
    (error) => {
      // Lös detta fel! Friendly reminder :)
    }
    )
  }

}
