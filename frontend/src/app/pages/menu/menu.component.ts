import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  menu : Menu;
  weekNr : string;

  constructor(private menuService: MenuService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.weekNr = params.weekNr;
        this.menuService.getMenu(params.menuId).subscribe((menu: Menu) => {
          this.menu = menu;
        })
      }
    )

  }



}
