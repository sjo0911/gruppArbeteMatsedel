import { Subscription } from 'rxjs';
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
  subscriptions : Subscription[];
  constructor(private menuService : MenuService, private alert : Alert) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }

  createMenu(menuName : string, startDate : Date, endDate : Date) {
    let datePipe: DatePipe = new DatePipe('en-US');
    if(menuName.length < 1) {
      this.alert.showAlert('', 'Input för menynamnet är för kort. Testa igen!', 'warning');
    } else if (menuName.length > 40) {
      this.alert.showAlert('', 'Input för menynamnet är för långt. Testa igen!', 'warning');
    } else {
      let menu : Menu = new Menu();
      menu.menuName = menuName;
      menu.startDate = startDate;
      menu.endDate = endDate;
      let sub: Subscription = this.menuService.postMenu(menu).subscribe(() => {
      })
      this.subscriptions.push(sub);
      this.alert.showAlertAndUpdatePage('Sparad!', 'Matsedeln har blivit sparad.', 'success');
    }
  }
}
