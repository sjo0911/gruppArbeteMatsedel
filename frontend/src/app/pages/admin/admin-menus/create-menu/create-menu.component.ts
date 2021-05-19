import { Menu } from './../../../../models/menu';
import { MenuService } from './../../../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';
import { Alert } from 'src/assets/alert';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-create-menu',
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.scss']
})
export class CreateMenuComponent implements OnInit {
  currentDate = new Date();
  constructor(private menuService : MenuService, private alert : Alert) { }

  ngOnInit(): void {
  }

  createMenu(menuName : string, startDate : Date, endDate : Date) {
    let datePipe: DatePipe = new DatePipe('en-US');
    if(menuName.length < 1) {
      this.alert.showAlert('', 'Input för menynamnet är för kort. Testa igen!', 'warning');
    } else if (menuName.length > 40) {
      this.alert.showAlert('', 'Input för menynamnet är för långt. Testa igen!', 'warning');
    } else if (!(datePipe.transform(startDate, 'EEEE') === 'Monday')) {
      this.alert.showAlert('', 'Startdatum för matsedeln måste vara en måndag!', 'warning');
    } else if (!(datePipe.transform(endDate, 'EEEE') === 'Sunday')) {
      this.alert.showAlert('', 'Slutdatum för matsedeln måste vara en söndag!', 'warning');
    } else {
      let menu : Menu = new Menu();
      menu.menuName = menuName;
      menu.startDate = startDate;
      menu.endDate = endDate;
      this.menuService.postMenu(menu).subscribe(() => {
      })
      this.alert.showAlertAndUpdatePage('Sparad!', 'Matsedeln har blivit sparad.', 'success');
    }
  }
}
