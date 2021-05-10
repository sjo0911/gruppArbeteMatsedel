import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { Week } from 'src/app/models/week';
import { Day } from 'src/app/models/day';
import { DateHandlerService } from 'src/app/services/date-handler.service';
import { SharingService } from 'src/app/services/sharing.service';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-meals.component.html',
  styleUrls: ['./admin-meals.component.scss']
})
export class AdminMealsComponent implements OnInit {
  week : Week;
  menu : Menu;
  subscriptions : Subscription[] = [];

  constructor(private dateHandlerService : DateHandlerService, private sharingService : SharingService, private menuService : MenuService) {

   }

  ngOnInit(): void {
    let sub: Subscription = this.sharingService.getObservableWeek().subscribe((week : Week) => {
      this.week = week;
    });
    this.subscriptions.push(sub);
    let sub2 : Subscription = this.sharingService.getObservableMenu().subscribe((menu : Menu) => {
      this.menu = menu;
    })
    this.subscriptions.push(sub2);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    })
  }

  getFoodSpecs(meal : Meal) : string {
    let returnString : string = '';
    meal.foodSpecs.forEach(foodSpec => {
      if(foodSpec === 'veg') {
        returnString += `<i class="fas fa-seedling" title="Vegetarisk"></i>`;
      } else if(foodSpec === 'hot') {
        returnString += `<i class="fas fa-pepper-hot" title="Stark"></i>`;
      } else if(foodSpec === 'pig') {
        returnString += `<i class="fas fa-bacon" title="Fläsk"></i>`;
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

    let sub: Subscription =this.menuService.deleteMeal(this.menu._id, mealId).subscribe(() => {

    });
    this.subscriptions.push(sub);
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
    meal.foodSpecs = [];
      if(veg.checked) {
        meal.foodSpecs.push(veg.value);
      }
      if(hot.checked) {
        meal.foodSpecs.push(hot.value);
      }
      if(pig.checked) {
        meal.foodSpecs.push(pig.value);
      }
      let sub: Subscription =this.menuService.updateMeal(meal, this.menu._id).subscribe(() => {
        this.subscriptions.push(sub);
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
      meal._id = uuidv4();
      day.meals.push(meal);
      let sub : Subscription= this.menuService.postMeal(meal, this.menu._id).subscribe((mealId) => {

      });
      this.subscriptions.push(sub);
      form.reset();
  }

}
