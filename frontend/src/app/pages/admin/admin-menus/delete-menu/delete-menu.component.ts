import { Menu } from './../../../../models/menu';
import { Observable, Subscription } from 'rxjs';
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
  subscriptions : Subscription[];

  constructor(private menuService:MenuService, private alert : Alert) {
    this.subscriptions = [];
  }

  ngOnInit(): void {
    this.deleteMenuTitle = "Välj matsedel att ta bort: ";
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }


  updateDeleteMenuTitle(menu : Menu) {
    this.deleteMenuTitle = menu.menuName;
    this.menuToDeleteId = menu._id;
  }

  deleteMenu() {
    if(this.menuToDeleteId === '') {
      this.alert.showAlert('', 'Du måste välja en matsedel att ta bort.', 'error');
    } else {
      this.alert.showAdvancedAlert('VARNING', 'Vill du ta bort denna matsedel?', 'warning', 'Ja, ta bort', 'Avbryt').then((result) => {
        if (result.isConfirmed) {
          let sub: Subscription =this.menuService.deleteMenu(this.menuToDeleteId).subscribe(() => {
          });
          this.subscriptions.push(sub);
          this.alert.showAlertAndUpdatePage('Borttagen!', 'Matsedeln har blivit borttagen.', 'success');
        }
      });
    }
  }
}
