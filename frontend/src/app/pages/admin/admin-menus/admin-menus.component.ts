import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-admin-menus',
  templateUrl: './admin-menus.component.html',
  styleUrls: ['./admin-menus.component.scss']
})
export class AdminMenusComponent implements OnInit {

  subscriptions : Subscription[] = [];
  currentDate = new Date();
  $menu : Observable<any>;
  editMenuTitle : string;
  menuToEdit : Menu = new Menu();
  menuNameToEdit : string;
  chosenMenuStartDate : Date;
  chosenMenuEndDate : Date;
  deleteMenuTitle : string;
  menuToDeleteId : string;

  constructor(private menuService : MenuService) {
    this.editMenuTitle = "Välj matsedel att redigera: "
    this.menuNameToEdit = "";
    this.deleteMenuTitle = "Välj matsedel att ta bort: ";
  }

  ngOnInit(): void {
    this.$menu = this.menuService.getMenus();
  }

  createMenu(menuName : string, startDate : Date, endDate : Date) {
    let menu : Menu = new Menu();
    menu.menuName = menuName;
    menu.startDate = startDate;
    menu.endDate = endDate;
    this.menuService.postMenu(menu).subscribe(() => {
    })
  }

  editMenu(menu : Menu) {
    console.log("Här" + menu.menuName);
    this.editMenuTitle = menu.menuName;
    this.menuToEdit = menu;
    this.menuNameToEdit = menu.menuName;
    console.log("andra" + this.menuNameToEdit);
    console.log(this.menuToEdit);
    this.chosenMenuStartDate = menu.startDate;
    this.chosenMenuEndDate = menu.endDate;
  }

  saveEditedMenu(menuName : string, startDate : Date, endDate : Date) {
    this.menuToEdit.menuName = menuName;
    console.log(this.menuToEdit);
    this.menuToEdit.startDate = startDate;
    this.menuToEdit.endDate = endDate;
    this.menuService.updateMenu(this.menuToEdit).subscribe(() => {
    })
  }

  updateDeleteMenuTitle(menu : Menu) {
    this.deleteMenuTitle = menu.menuName;
    this.menuToDeleteId = menu._id;
  }

  deleteMenu() {
    this.menuService.deleteMenu(this.menuToDeleteId).subscribe(() => {
    })
  }

}
