import { Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Meal } from 'src/app/models/meal';
import { Week } from 'src/app/models/week';
import { Day } from 'src/app/models/day';
import { SharingService } from 'src/app/services/sharing.service';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';
import { v4 as uuidv4 } from 'uuid';
import  Swal  from 'sweetalert2';
import { Alert } from 'src/assets/alert';
import { AuthService } from '@auth0/auth0-angular';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin-meals.component.html',
  styleUrls: ['./admin-meals.component.scss']
})
export class AdminMealsComponent implements OnInit {
  week : Week;
  menu : Menu;
  subscriptions : Subscription[] = [];
  currentUser : User;


  constructor(private sharingService : SharingService, private menuService : MenuService, private alert : Alert,private changeDetector: ChangeDetectorRef, private auth: AuthService) {

  }

  ngOnInit(): void {

    this.subscriptions.push(this.auth.user$.subscribe((user) => {
      this.currentUser = new User();
      this.currentUser.setUserFromAuthPic(user.picture);
    }));

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

  deleteMeal(mealId : string, day : Day) : void{
    if(!this.currentUser.permissions.some((permission) => permission === 'admin') && !this.currentUser.menuIds.some((menuId) => menuId === this.menu._id)) {
      this.alert.showAlert('', 'Du måste ha behörighet för att administrera denna matsedel!', 'error');
    } else {
      this.alert.showAdvancedAlert('VARNING', 'Vill du ta bort denna maträtt?', 'warning', 'Ja, ta bort', 'Avbryt').then((result) => {
          if (result.isConfirmed) {
            day.meals.forEach((meal, index) => {
              if(meal._id === mealId) {
                day.meals.splice(index, 1);
              }
            });
            let sub: Subscription =this.menuService.deleteMeal(this.menu._id, mealId).subscribe(() => {
            });
            this.subscriptions.push(sub);

            this.alert.showAlert('Borttagen!', 'Vald maträtt har blivit borttagen.', 'success');
          }
        })
    }
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
    if(!this.currentUser.permissions.some((permission) => permission === 'admin') && !this.currentUser.menuIds.some((menuId) => menuId === this.menu._id)) {
      this.alert.showAlert('', 'Du måste ha behörighet för att administrera denna matsedel!', 'error');
    } else {
      if(mealName.length < 1) {
        this.alert.showAlert('', 'Input för maträtten är för kort. Testa igen!', 'error');
      } else if (mealName.length > 85) {
        this.alert.showAlert('', 'Input för maträtten är för långt. Testa igen!', 'error');
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

          this.alert.showAlert('Uppdaterad!', 'Maträtten har blivit uppdaterad.', 'success');
      }
    }
  }

  saveMeal(day: Day, newMealName : string, veg : any, hot : any, pig: any, form : any) {
    if(!this.currentUser.permissions.some((permission) => permission === 'admin') && !this.currentUser.menuIds.some((menuId) => menuId === this.menu._id)) {
      this.alert.showAlert('', 'Du måste ha behörighet för att administrera denna matsedel!', 'error');
    } else {
      if(newMealName.length < 1) {
        this.alert.showAlert('', 'Input för maträtten är för kort. Testa igen!', 'error');
      } else if (newMealName.length > 85) {
        this.alert.showAlert('', 'Input för maträtten är för långt. Testa igen!', 'error');
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

          this.alert.showAlert('Sparad!', 'Maträtten har blivit sparad.', 'success');
      }
    }
  }
}
