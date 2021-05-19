import { MenuService } from './../../../../services/menu.service';
import { Observable } from 'rxjs';
import { Menu } from './../../../../models/menu';
import { Component, OnInit, Input } from '@angular/core';
import { Alert } from 'src/assets/alert';
import { DatePipe } from '@angular/common';

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

  constructor(private menuService: MenuService, private alert : Alert) {
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
    let datePipe: DatePipe = new DatePipe('en-US');
    if (menuName === '') {
      this.alert.showAlert('', 'Du måste välja en matsedel att uppdatera.', 'warning');
    } else if (menuName.length < 1) {
      this.alert.showAlert('', 'Input för menynamnet är för kort. Testa igen!', 'warning');
    } else if (menuName.length > 40) {
      this.alert.showAlert('', 'Input för menynamnet är för långt. Testa igen!', 'warning');
    } else if (!(datePipe.transform(startDate, 'EEEE') === 'Monday')) {
      this.alert.showAlert('', 'Startdatum för matsedeln måste vara en måndag!', 'warning');
    } else if (!(datePipe.transform(endDate, 'EEEE') === 'Sunday')) {
      this.alert.showAlert('', 'Slutdatum för matsedeln måste vara en söndag!', 'warning');
    } else {
      this.menuToEdit.menuName = menuName;
      this.menuToEdit.startDate = startDate;
      this.menuToEdit.endDate = endDate;
      this.menuService.updateMenu(this.menuToEdit).subscribe(() => {
      })
      this.alert.showAlertAndUpdatePage('Uppdaterad!', 'Matsedeln har blivit uppdaterad.', 'success');
    }
  }


}
