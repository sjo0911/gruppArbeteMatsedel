import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Week } from '../models/week';
import { Menu } from '../models/menu';
import { Meal } from '../models/meal';
import { Day } from '../models/day';

@Injectable({
  providedIn: 'root'
})
export class DateHandlerService {
  datePipe: DatePipe ;
  constructor() {
    this.datePipe = new DatePipe('en-US');
  }

  getWeeks(startDate: Date, endDate: Date): Week[] {

    let week: Week = new Week();
    let weeks: Week[] = new Array();
    var newEndDate = new Date(endDate);
    week.startDate = startDate;
    for (var day = new Date(startDate); day <= newEndDate; day.setDate(day.getDate() + 1)) {
      if (this.datePipe.transform(day, 'EEEE') === 'Monday') {
        week.startDate = day;
      } else if (this.datePipe.transform(day, 'EEEE') === 'Sunday') {
        week.endDate = day;
      }
      week.weekNr = this.datePipe.transform(day, 'w');
      weeks.push(week);
      week = new Week();
    }
    return weeks;
  }

  getCurrentWeek(): string {
    let dateNow: Date = new Date(Date.now());
    let datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(dateNow, 'w');
  }

  getPreviousWeek(weeks: Week[], week: Week): Week {
    let previousWeekNr = parseInt(week.weekNr) - 1;
    let returnWeek: Week;
    weeks.forEach(week => {
      if (parseInt(week.weekNr) === previousWeekNr) {
        returnWeek = week;
      }
    });
    return returnWeek;
  }

  getNextWeek(weeks: Week[], week: Week): Week {
    let nextWeek = parseInt(week.weekNr) + 1;
    let returnWeek: Week;
    weeks.forEach(week => {
      if (parseInt(week.weekNr) === nextWeek) {
        returnWeek = week;
      }
    });
    return returnWeek;
  }

  private createDays(week: Week): Week {
    var endDate = new Date(week.endDate.getDate() - 2);
    let day: Day;
    for (var date = new Date(week.startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      day = new Day();
      day.date = date;
      week.days.push(day);
    }

    return week;
  }

  private addMeals(returnWeek: Week) {
    if (returnWeek.meals) {
      returnWeek.meals.forEach(meal => {
        returnWeek.days.forEach(day=> {
          if(this.datePipe.transform(meal.mealDate, 'EEEE') === this.datePipe.transform(day.date, 'EEEE')){
            day.meals.push(meal);
          }
        })
      });
     }
  }

  /*
        dayExist = false;
        days.forEach(day => {
          if(day.date === meal.mealDate) {
            dayExist = true;
            day.meals.push(meal);
          }
        });
        if(!dayExist) {
          day = new Day();
          day.meals.push(meal);
          day.date = meal.mealDate;
          days.push(day);
          returnWeek.days.push(day);
        }

  */

  getMealsOfWeek(menu: Menu, weekNr: string): Week {
    let datePipe: DatePipe = new DatePipe('en-US');
    let returnWeek: Week = new Week();

    if (menu.meals) {
      menu.meals.forEach(meal => {
        if (weekNr === datePipe.transform(meal.mealDate, 'w')) {
          returnWeek.meals.push(meal);
        }
      });
    }
    this.createDays(returnWeek)
    this.addMeals(returnWeek);
    return returnWeek;
  }



  // convertToWeek(date:Date):string {
  //   let datePipe: DatePipe = new DatePipe('en-US');
  //   return datePipe.transform(date, 'w');
  // }

  // convertToDay(date: Date){
  //   let datePipe: DatePipe = new DatePipe('en-US');
  //   return datePipe.transform(date, '    EEEE');
  // }

  // convertStartEndToWeeks(){
  //   let from = new Date(2012,0,1);
  //   let to = new Date(2012,1,20);
  //   let week:Weeks;
  //   let weeeks:Weeks[];
  //   week = new Weeks();
  //   week.startDate = from;
  //   week.weekNumber = this.convertToWeek(from);
  //   for (let day = from; day <= to; day.setDate(day.getDate() + 1)) {
  //     if(this.convertToDay(day) === 'Monday'){
  //       week.startDate = day;
  //       week.weekNumber = this.convertToWeek(day);
  //     }
  //     if(this.convertToDay(day) === 'Sunday'){
  //       week.endDate = day;
  //       weeeks.push(week);
  //       week = new Weeks();
  //     }

  //  };

  // }


}
