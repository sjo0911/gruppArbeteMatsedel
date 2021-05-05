import { Day } from "./day";
import { Meal } from "./meal";

export class Week {

  startDate: Date;
  endDate: Date;
  weekNr: string;

  days: Day[];
  // menuId : string;

  constructor() {
    this.days = new Array();
  }

}
