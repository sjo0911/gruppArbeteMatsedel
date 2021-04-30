import { Day } from "./day";
import { Meal } from "./meal";

export class Week {
  startDate: Date;
  endDate: Date;
  weekNr: string;

  days: Day[];
  meals : Meal[];
}
