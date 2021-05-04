import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { Week } from 'src/app/models/week';
import { DateHandlerService } from 'src/app/services/date-handler.service';
import { MenuService } from 'src/app/services/menu.service';
import { SharingService } from 'src/app/services/sharing.service';

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
    this.noInput = "MAT SAKNASSSS";
  }

  ngOnInit(): void {
    // let menuId : string;
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     this.weekNr = params.weekNr;
    //     menuId = params.menuId;
    //   })
    //   this.menuService.getMenu(menuId).subscribe((menu : Menu) => {
    //     this.menu = menu;
    //     this.week = this.dateHandlerService.getMealsOfWeek(this.menu, this.weekNr);
    //   })

      this.sharingService.getObservable().subscribe((week : Week) => {
        this.week = week;
        console.log(week.weekNr);
      })

  }





}
