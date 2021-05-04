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

  constructor() { }

  // getWeeks(startDate: Date, endDate: Date) : Week[] {
  //   let datePipe: DatePipe = new DatePipe('en-US');
  //   let week : Week = new Week();
  //   let weeks : Week[] = new Array();
  //   var newEndDate = new Date(endDate);
  //   for (var day = new Date(startDate); day <= newEndDate; day.setDate(day.getDate() + 7)) {
  //     week.weekNr = datePipe.transform(day, 'w');
  //     weeks.push(week);
  //     week = new Week();
  //   }
  //   return weeks;
  // }

  getWeeks(menu : Menu) : Week[] {
    let datePipe: DatePipe = new DatePipe('en-US');
    let week : Week = new Week();
    let weeks : Week[] = new Array();
    var newEndDate = new Date(menu.endDate);
    let day : Day;
    week.startDate = menu.startDate;
    week.weekNr = datePipe.transform(menu.startDate, 'w');
    for (var date = new Date(menu.startDate); date <= newEndDate; date.setDate(date.getDate() + 1)) {
      if(datePipe.transform(date, 'EEEE') === 'Monday') {
        week = new Week();
        week.startDate = date;
        week.weekNr = datePipe.transform(date, 'w');
      } else if (datePipe.transform(date, 'EEEE') === 'Sunday') {
        week.endDate = date;
        weeks.push(week);
      }
      if(datePipe.transform(date, 'EEEE') !== 'Saturday' || datePipe.transform(date, 'EEEE') !== 'Sunday') {
        day = new Day();
        day.date = date;
        menu.meals.forEach(meal => {
          if(datePipe.transform(meal.mealDate, 'mediumDate') === datePipe.transform(date, 'mediumDate')) {
            day.meals.push(meal);
          }
        });
        week.days.push(day);
      }
    }
    return weeks;
  }

  getCurrentWeek() : string {
    let dateNow : Date = new Date(Date.now());
    let datePipe: DatePipe = new DatePipe('en-US');
    return datePipe.transform(dateNow, 'w');
  }

  getPreviousWeek(weeks : Week [], week : Week) : Week{
    let previousWeekNr = parseInt(week.weekNr) - 1;
    let returnWeek : Week;
    weeks.forEach(week => {
      if(parseInt(week.weekNr) === previousWeekNr) {
        returnWeek = week;
      }
    });
    return returnWeek;
  }

  getNextWeek(weeks : Week[], week : Week) : Week {
    let nextWeek = parseInt(week.weekNr) + 1;
    let returnWeek : Week;
    weeks.forEach(week => {
      if(parseInt(week.weekNr) === nextWeek) {
        returnWeek = week;
      }
    });
    return returnWeek;
  }

  // getMealsOfWeek(menu : Menu, weekNr : string) : Week {
  //   let datePipe : DatePipe = new DatePipe('en-US');
  //   let returnWeek : Week = new Week();

  //   if(menu.meals) {
  //     menu.meals.forEach(meal => {
  //       if(weekNr === datePipe.transform(meal.mealDate, 'w')) {
  //         returnWeek.meals.push(meal);
  //       }
  //     });
  //   }

  //   let day : Day;
  //   let days : Day[] = new Array();
  //   let dayExist : boolean;
  //   if(returnWeek.meals) {
  //     returnWeek.meals.forEach(meal => {
  //       dayExist = false;
  //       days.forEach(day => {
  //         if(day.date === meal.mealDate) {
  //           dayExist = true;
  //           day = day;
  //           day.meals.push(meal);
  //         }
  //       });
  //       if(!dayExist) {
  //         day = new Day();
  //         day.meals.push(meal);
  //         day.date = meal.mealDate;
  //         days.push(day);
  //       }
  //     });
  //   }
  //   returnWeek.weekNr = weekNr;
  //   return returnWeek;
  // }

}
