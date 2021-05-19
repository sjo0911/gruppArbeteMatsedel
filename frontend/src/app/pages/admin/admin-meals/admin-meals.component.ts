import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { Week } from 'src/app/models/week';
import { Day } from 'src/app/models/day';
import { SharingService } from 'src/app/services/sharing.service';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { v4 as uuidv4 } from 'uuid';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-meals.component.html',
  styleUrls: ['./admin-meals.component.scss']
})
export class AdminMealsComponent implements OnInit {
  week : Week;
  menu : Menu;
  subscriptions : Subscription[] = [];


  constructor(private sharingService : SharingService, private menuService : MenuService) {

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
    Swal.fire({
      title: 'VARNING',
      text: 'Vill du ta bort denna maträtt?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ja, ta bort',
      cancelButtonText: 'Avbryt',
      confirmButtonColor: "#063752",
      cancelButtonColor: "#063752"
    }).then((result) => {
      if (result.isConfirmed) {
        day.meals.forEach((meal, index) => {
          if(meal._id === mealId) {
            day.meals.splice(index, 1);
          }
        });
        let sub: Subscription =this.menuService.deleteMeal(this.menu._id, mealId).subscribe(() => {
        });
        this.subscriptions.push(sub);

        this.showAlert('Borttagen!', 'Vald maträtt har blivit borttagen.', 'success');
      }
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
    if(mealName.length < 1) {
      this.showAlert('', 'Input för maträtten är för kort. Testa igen!', 'warning');
    } else if (mealName.length > 85) {
      this.showAlert('', 'Input för maträtten är för långt. Testa igen!', 'warning');
    } else {
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

        this.showAlert('Uppdaterad!', 'Maträtten har blivit uppdaterad.', 'success');
    }
  }

  saveMeal(day: Day, newMealName : string, veg : any, hot : any, pig: any, form : any) {
    if(newMealName.length < 1) {
      this.showAlert('', 'Input för maträtten är för kort. Testa igen!', 'warning');
    } else if (newMealName.length > 85) {
      this.showAlert('', 'Input för maträtten är för långt. Testa igen!', 'warning');
    } else {
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

        this.showAlert('Sparad!', 'Maträtten har blivit sparad.', 'success');
    }
  }

  showAlert(title : string, text : string, icon : any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: '#063752'
    })
  }
}
