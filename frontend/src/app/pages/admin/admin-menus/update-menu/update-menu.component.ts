import { MenuService } from './../../../../services/menu.service';
import { Observable } from 'rxjs';
import { Menu } from './../../../../models/menu';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.scss']
})
export class UpdateMenuComponent implements OnInit {

  @Input() $menu : Observable<any>;
  editMenuTitle : string;
  menuToEdit : Menu = new Menu();
  menuNameToEdit : string;
  chosenMenuStartDate : Date;
  chosenMenuEndDate : Date;

  constructor(private menuService: MenuService) {
    this.editMenuTitle = "Välj matsedel att redigera: "
    this.menuNameToEdit = "";

   }

  ngOnInit(): void {
    this.$menu = this.menuService.getMenus();
  }

  editMenu(menu : Menu) {
    this.editMenuTitle = menu.menuName;
    this.menuToEdit = menu;
    this.menuNameToEdit = menu.menuName;
    this.chosenMenuStartDate = menu.startDate;
    this.chosenMenuEndDate = menu.endDate;
  }

  saveEditedMenu(menuName : string, startDate : Date, endDate : Date) {
    this.menuToEdit.menuName = menuName;
    this.menuToEdit.startDate = startDate;
    this.menuToEdit.endDate = endDate;
    this.menuService.updateMenu(this.menuToEdit).subscribe(() => {
    })
  }


}
