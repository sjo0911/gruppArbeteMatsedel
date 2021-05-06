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
      if(foodSpec === 'veg') {
        returnString += `<i class="fas fa-seedling"></i>`;
      } else if(foodSpec === 'hot') {
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

    // Kan ej delete efter att ha lagt till nytt meal innan uppdatering av sidan eftersom meal saknar id!!

    this.menuService.deleteMeal(this.menu._id, mealId).subscribe(() => {

    },
    (err) => {
       // Lös detta fel! Friendly reminder :)
    })
  }

  checkFoodSpec(foodSpecs: string[], wantedSpec: string): boolean {
    let bol = false;
    foodSpecs.forEach((foodSpec) => {
      if(foodSpec === wantedSpec) {
        bol = true;
      }
    })
    return bol;
  }

  updateMeal(meal: Meal, day: Day, mealName : string, veg : any, hot : any, pig: any) {
    meal.mealName = mealName;
    // Kolla att det inte blir dubbletter i databasen
      meal.foodSpecs.forEach((foodSpec, index) => {
        foodSpec.slice(index, 1);
      })
      if(veg.checked) {
        meal.foodSpecs.push(veg.value);
      }
      if(hot.checked) {
        meal.foodSpecs.push(hot.value);
      }
      if(pig.checked) {
        meal.foodSpecs.push(pig.value);
      }
      this.menuService.updateMeal(meal, this.menu._id).subscribe(() => {

      },
      (err) => {
         // Lös detta fel! Friendly reminder :)
      });
  }

  saveMeal(day: Day, newMealName : string, veg : any, hot : any, pig: any, form : any) {
    let meal : Meal = new Meal();
    meal.mealName = newMealName;
    meal.mealDate = new Date(day.date);
      if(veg.checked) {
        meal.foodSpecs.push(veg.value);
      }
      if(hot.checked) {
        meal.foodSpecs.push(hot.value);
      }
      if(pig.checked) {
        meal.foodSpecs.push(pig.value);
      }
      day.meals.push(meal);
      this.menuService.postMeal(meal, this.menu._id).subscribe((mealId) => {
        console.log(mealId);
      });

      form.reset();
  }

}
