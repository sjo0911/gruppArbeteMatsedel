import { Menu } from './../../../../models/menu';
import { Observable } from 'rxjs';
import { MenuService } from './../../../../services/menu.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-delete-menu',
  templateUrl: './delete-menu.component.html',
  styleUrls: ['./delete-menu.component.scss']
})
export class DeleteMenuComponent implements OnInit {
  @Input() $menu : Observable<any>;
  constructor(private menuService:MenuService) { }
  deleteMenuTitle : string;
  menuToDeleteId : string;
  ngOnInit(): void {

    this.deleteMenuTitle = "Välj matsedel att ta bort: ";
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
