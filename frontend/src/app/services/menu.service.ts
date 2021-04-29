import { Injectable } from '@angular/core';
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
}
