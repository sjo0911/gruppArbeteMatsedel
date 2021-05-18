import { Component, OnInit, Input } from '@angular/core';
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
  $menu :Observable<any>;

  constructor(private menuService : MenuService) {

  }

  ngOnInit(): void {
    this.$menu = this.menuService.getMenus();
  }

}
