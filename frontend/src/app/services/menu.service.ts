import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from '../models/menu';
import { WebReqService } from './web-req.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private webReqService: WebReqService) { }

  getMenus() {
    return this.webReqService.get('menu');
  }

  getMenu(_menuId: string) {
    return this.webReqService.get(`menu/${_menuId}`);
  }

  updateMenu(menu : Menu) {
    return this.webReqService.patch(`menu/${menu._id}`, menu);
  }
}
