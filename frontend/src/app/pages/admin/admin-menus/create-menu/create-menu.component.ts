import { Menu } from './../../../../models/menu';
import { MenuService } from './../../../../services/menu.service';
import { Component, OnInit } from '@angular/core';
import  Swal  from 'sweetalert2';

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
    if(menuName.length < 1) {
      this.showAlert('', 'Input för menynamnet är för kort. Testa igen!', 'warning');
    } else if (menuName.length > 40) {
      this.showAlert('', 'Input för menynamnet är för långt. Testa igen!', 'warning');
    } else {
      let menu : Menu = new Menu();
      menu.menuName = menuName;
      menu.startDate = startDate;
      menu.endDate = endDate;
      this.menuService.postMenu(menu).subscribe(() => {
      })
    }
  }

  showAlert(title : string, text : string, icon : any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonColor: '#063752'
    })
  }

}
