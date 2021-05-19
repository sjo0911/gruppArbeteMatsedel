import { By } from '@angular/platform-browser';
import { Day } from './../../../models/day';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuMockup } from 'src/app/mockups/menu-mockup';

import { AdminMealsComponent } from './admin-meals.component';

import { SharingService } from 'src/app/services/sharing.service';
import { MenuService } from 'src/app/services/menu.service';
import { of, Subject } from 'rxjs';
import { Week } from 'src/app/models/week';
import { Menu } from 'src/app/models/menu';
import { Button } from 'protractor';

describe('AdminComponent', () => {
  let component: AdminMealsComponent;
  let fixture: ComponentFixture<AdminMealsComponent>;

  let menuMockup : MenuMockup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMealsComponent ],
      providers: [
        {provide: SharingService, useClass: SharingServiceStub},
        {provide: MenuService, useClass: MenuServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    menuMockup = new MenuMockup();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should return true boolean if meal contains "pig"', () => {
    expect(component.checkFoodSpec(menuMockup.getMenu().meals[0].foodSpecs, "pig")).toBeTruthy();
  });

  it('should return false boolean if meal does not contain "veg"', () => {
    expect(component.checkFoodSpec(menuMockup.getMenu().meals[0].foodSpecs, "veg")).toBeFalsy();
  });

  // it('should contain a button with title "Uppdatera"', () => {
  //   const btn = fixture.debugElement.nativeElement.querySelector('#updateButton');
  //   expect(btn.title).toContain('Uppdatera');

  // });

  it('should produce 3 days with 1 meal per day(3 meals  in total) with mealname: "fläskpannkaka" and hava an "pig" icon in 4th place in its form wich is checked', (done) => {
    component.week = new Helper().getWeek(3, 1);

    fixture.detectChanges()
    fixture.whenStable().then(() => {
      const daysDiv = fixture.debugElement.queryAll(By.css('div.day-content'));
      const mealsDiv = fixture.debugElement.queryAll(By.css('div.day-meals'));
      const updateMealNameInputs = fixture.debugElement.queryAll(By.css('input.update-meal-input-field'));
      expect(daysDiv.length).toBe(3);
      expect(mealsDiv.length).toBe(3);
      mealsDiv.forEach(div => {
        expect(div.nativeNode.children[0][3].defaultValue).toBe("pig");
        expect(div.nativeNode.children[0][3].checked).toBe(true);
      });
      updateMealNameInputs.forEach((input) => {
        expect(input.nativeNode.value).toBe("fläskpannkaka")
      })
    });
    done();
  });

  it('should produce 5 days with 3 meals per day and delete each meal when each delete buttons i clicked', (done) => {
    component.week = new Helper().getWeek(5, 3);
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      const daysDiv = fixture.debugElement.queryAll(By.css('div.day-content'));
      const mealsDiv = fixture.debugElement.queryAll(By.css('div.day-meals'));
      expect(daysDiv.length).toBe(5);
      expect(mealsDiv.length).toBe(15);
      const deleteButtons = fixture.debugElement.queryAll(By.css('button.delete-button'));
      deleteButtons.forEach(button => {
        button.nativeNode.click();
      });
      fixture.detectChanges()
      fixture.whenStable().then(() => {
        const mealsDiv2 = fixture.debugElement.queryAll(By.css('div.day-meals'));
         expect(mealsDiv2.length).toBe(0);
         component.week.days.forEach(day => {
           expect(day.meals.length).toBe(0);
         })
      });
    });
    done();
  })

  it('should produce 3 days with 0 meals and write in mealname and click save in each day to get 3 meals', (done) => {
    component.week = new Helper().getWeek(3, 0);
    fixture.detectChanges()
    fixture.whenStable().then(() => {
      const daysDiv = fixture.debugElement.queryAll(By.css('div.day-content'));
      const mealsDiv = fixture.debugElement.queryAll(By.css('div.day-meals'));
      expect(daysDiv.length).toBe(3);
      expect(mealsDiv.length).toBe(0);
      const inputFields = fixture.debugElement.queryAll(By.css('input.new-meal-input-field'));
      const saveButton = fixture.debugElement.queryAll(By.css('button.save-button'));
      debugger;
      inputFields.forEach(inputField => {
        inputField.nativeNode.value = "glassbåtar";
      })
      saveButton.forEach(button => {
        button.nativeNode.click();
      });
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const mealsDiv2 = fixture.debugElement.queryAll(By.css('div.day-meals'));
        expect(mealsDiv2.length).toBe(3);
        component.week.days.forEach(day => {
          expect(day.meals.length).toBe(1);
        })
      })
    });
    done();
  })

  it('should produce 3 days with 1 meal per day(3 meals  in total) and update their meal names to glassbåtar"', (done) => {
    component.week = new Helper().getWeek(3, 1);

    fixture.detectChanges()
    fixture.whenStable().then(() => {
      const updateMealNameInputs = fixture.debugElement.queryAll(By.css('input.update-meal-input-field'));
      const updateButtons = fixture.debugElement.queryAll(By.css('button.update-button'));
      updateMealNameInputs.forEach((input) => {
        expect(input.nativeNode.value).toBe("fläskpannkaka");
        input.nativeNode.value = "glassbåtar";
      })
      updateButtons.forEach((button) => {
        button.nativeElement.click();
      })
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        component.week.days.forEach(day => {
          expect(day.meals[0].mealName).toBe("glassbåtar");
        });
      })
    });
    done();
  });

});

class SharingServiceStub {
  getObservableWeek() : Subject<Week> {
    return new Subject();
  }

  getObservableMenu() : Subject<Menu> {
    return new Subject();
  }
}

class MenuServiceStub {

}

class Helper {
  getWeek(days: number, mealsPerDay : number) : Week {
    let week : Week = new Week;
    week.startDate = new Date("2021-05-03");
    let endDay = 3 + days;
    let endDateString = "2021-05-" + endDay;
    week.endDate = new Date(endDateString);
    let date = new Date(week.startDate);
    for(date; date <= week.endDate; date.setDate(date.getDate() + 1)) {
      let day : Day = new Day;
      day.date = new Date(date);
      for(let i = 0; i < mealsPerDay; i++) {
        day.meals.push({_id: days + "abc" + mealsPerDay, mealName: "fläskpannkaka", mealDate: new Date(day.date), foodSpecs: ["pig"]});
      }
      week.days.push(day);
    }
    return week;
  }
}
