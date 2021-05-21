import { Menu } from './../../../../models/menu';
import { Observable } from 'rxjs';
import { MenuService } from './../../../../services/menu.service';
import { Component, OnInit, Input } from '@angular/core';
import { Alert } from 'src/assets/alert';

@Component({
  selector: 'app-delete-menu',
  templateUrl: './delete-menu.component.html',
  styleUrls: ['./delete-menu.component.scss']
})
export class DeleteMenuComponent implements OnInit {
  @Input() $menus : Observable<any>;
  deleteMenuTitle : string;
  menuToDeleteId : string = '';

  constructor(private menuService:MenuService, private alert : Alert) { }

  ngOnInit(): void {
    this.deleteMenuTitle = "Välj matsedel att ta bort: ";
  }


  updateDeleteMenuTitle(menu : Menu) {
    this.deleteMenuTitle = menu.menuName;
    this.menuToDeleteId = menu._id;
  }

  deleteMenu() {
    if(this.menuToDeleteId === '') {
      this.alert.showAlert('', 'Du måste välja en matsedel att ta bort.', 'warning');
    } else {
      this.menuService.deleteMenu(this.menuToDeleteId).subscribe(() => {
      })
      this.alert.showAlertAndUpdatePage('Borttagen!', 'Matsedeln har blivit borttagen.', 'success');
    }
  }
}
