import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Week } from '../models/week';

@Injectable({
  providedIn: 'root'
})
export class SharingService {

weekObserver: Subject<Week>;
week: Week;

  constructor() {
    this.week = new Week();
    this.weekObserver = new Subject<Week>();
  }

  setWeek(week : Week) {
    this.week = week;
    this.weekObserver.next(week);
  }

  getObservable() : Subject<Week> {
    return this.weekObserver;
  }
}
