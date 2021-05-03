import { Day } from "./day";
import { Meal } from "./meal";

export class Week {

  startDate: Date;
  endDate: Date;
  weekNr: string;

  days: Day[];
  meals : Meal[];

  constructor() {
    this.days = new Array();
    this.meals = new Array();
  }

}
