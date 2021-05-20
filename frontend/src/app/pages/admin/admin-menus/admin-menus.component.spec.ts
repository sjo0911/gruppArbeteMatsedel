import { Menu } from './../../../models/menu';
import { MenuMockup } from './../../../mockups/menu-mockup';
import { Observable, of } from 'rxjs';
import { MenuService } from './../../../services/menu.service';
import { Alert } from 'src/assets/alert';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenusComponent } from './admin-menus.component';

describe('AdminMenusComponent', () => {
  let component: AdminMenusComponent;
  let fixture: ComponentFixture<AdminMenusComponent>;
  let mockService : MenuService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenusComponent ],
      providers: [
        {provide: MenuService, useClass: MenuServiceStub},
        {provide: Alert, useClass: AlertStub}   ],
       } )
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockService = TestBed.inject(MenuService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call NgOnInit() & getMenus()', () => {
    const component = fixture.debugElement.componentInstance;
    let mockSpy = spyOn(mockService,"getMenus");
    component.ngOnInit();
    expect(mockSpy).toHaveBeenCalled();
  })
});

class AlertStub {
  showAdvancedAlert() {
    //Mockup på Alert. Skickar tillbacka ett object med isConfirmed = true. isConfirmed används
    //för att kolla om en måltid ska tas bort. Med denna mockup tas den alltid bort.
    const promise = new Promise((res, rej) => {
      const result = {isConfirmed : true};
      res(result);
    });
    return promise;
  }

  showAlert(){

  }
}

class MenuServiceStub {
  getMenus() : Observable<Menu> {
    return of(new MenuMockup().getMenu())
  }

  deleteMenu() {

  }
}
