import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, Subscription } from 'rxjs';
import { Menu } from 'src/app/models/menu';
import { User } from 'src/app/models/user';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-admin-menus',
  templateUrl: './admin-menus.component.html',
  styleUrls: ['./admin-menus.component.scss']
})
export class AdminMenusComponent implements OnInit {

  subscriptions : Subscription[] = [];
  $menus :Observable<any>;
  currentUser : User;

  constructor(private menuService : MenuService, private auth: AuthService) {

  }

  ngOnInit(): void {
    this.$menus = this.menuService.getMenus();

    this.subscriptions.push(this.auth.user$.subscribe((user) => {
      this.currentUser = new User();
      this.currentUser.setUserFromAuthPic(user.picture);
    }));
  }

}
