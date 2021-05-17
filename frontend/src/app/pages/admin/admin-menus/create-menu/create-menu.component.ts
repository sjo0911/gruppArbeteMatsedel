import { Menu } from './../../../../models/menu';
import { MenuService } from './../../../../services/menu.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {
  currentDate = new Date();
  constructor(private menuService : MenuService) { }

  ngOnInit(): void {
  }

  createMenu(menuName : string, startDate : Date, endDate : Date) {
    let menu : Menu = new Menu();
    menu.menuName = menuName;
    menu.startDate = startDate;
    menu.endDate = endDate;
    this.menuService.postMenu(menu).subscribe(() => {
    })
  }

}
