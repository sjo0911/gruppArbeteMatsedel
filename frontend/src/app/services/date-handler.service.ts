import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Week } from '../models/week';

@Injectable({
  providedIn: 'root'
})
export class DateHandlerService {

  constructor() { }

  getWeeks(startDate: Date, endDate: Date) : Week[] {
    let datePipe: DatePipe = new DatePipe('en-US');
    let week : Week = new Week();
    let weeks : Week[] = new Array();
    var newEndDate = new Date(endDate);
    for (var day = new Date(startDate); day <= newEndDate; day.setDate(day.getDate() + 7)) {
      week.weekNr = datePipe.transform(day, 'w');
      weeks.push(week);
      week = new Week();
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
