import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { Week } from 'src/app/models/week';
import { DateHandlerService } from 'src/app/services/date-handler.service';
import { MenuService } from 'src/app/services/menu.service';
import { SharingService } from 'src/app/services/sharing.service';
import { Meal } from 'src/app/models/meal';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu : Menu;
  weekNr : string;
  week : Week;
  noInput : string;

  constructor(private menuService: MenuService, private route : ActivatedRoute, private dateHandlerService : DateHandlerService, private sharingService : SharingService) {
    this.noInput = "MAT SAKNAS";
  }

  ngOnInit(): void {
      this.sharingService.getObservable().subscribe((week : Week) => {
        this.week = week;
      })

  }

  getFoodSpecs(meal : Meal) : string {
    let returnString : string = '';
    meal.foodSpecs.forEach(foodSpec => {
      if(foodSpec === 'vego') {
        returnString += `<i class="fas fa-seedling"></i>`;
      } else if(foodSpec === 'gurka') {
        returnString += `<i class="fas fa-pepper-hot"></i>`;
      } else if(foodSpec === 'pig') {
        returnString += `<i class="fas fa-bacon"></i>`;
      }
    });
    return returnString;
  }





}
