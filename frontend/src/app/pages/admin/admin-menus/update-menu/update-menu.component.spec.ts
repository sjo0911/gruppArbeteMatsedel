import { Alert } from 'src/assets/alert';
import { MenuService } from './../../../../services/menu.service';
import { MenuMockup } from './../../../../mockups/menu-mockup';
import { Menu } from './../../../../models/menu';
import { Observable, of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMenuComponent } from './update-menu.component';
import { By } from '@angular/platform-browser';
import { DOMHelper } from 'src/app/mockups/DOM-helper';

describe('UpdateMenuComponent', () => {
  let component: UpdateMenuComponent;
  let fixture: ComponentFixture<UpdateMenuComponent>;
  let menuMockup = new MenuMockup();
  let menu : any;
  let dh: DOMHelper<UpdateMenuComponent>;
  let mockService : MenuService;
  let menuServiceMock : MenuService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMenuComponent ],
      providers: [
        {provide: MenuService, useClass: MenuServiceStub},
        {provide: Alert, useClass: AlertStub},
        {provide: MenuService, useValue: menuServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    menu = menuMockup.getMenu();
    dh = new DOMHelper(fixture);
    mockService = TestBed.inject(MenuService);
  });

  describe('Create', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('HTML', () => {
    it('should contain a button with text "Spara uppdaterad matsedel"', ()=> {
      expect(dh.singleTextFromTagName("button")).toBe("Spara uppdaterad matsedel");
    });

    it('should contain a dropdown with 3 menus', (done) => {
      component.$menus = of([
        {_id: '123', menuName:'menu1', startDate: new Date("2021-05-20"), endDate: new Date("2021-06-20")},
        {_id: '345', menuName:'menu2', startDate: new Date("2021-05-20"), endDate: new Date("2021-06-20")},
        {_id: '678', menuName:'menu3', startDate: new Date("2021-05-20"), endDate: new Date("2021-06-20")}
      ]);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(dh.countFromTagName("a.navbar-item")).toBe(3);
      })
      done();
    });
  });

  describe('Check methods when buttons are clicked', () => {
    it('should call editMenu() when dropdown is clicked', (done) => {
      component.$menus = of([menu]);
      let mockSpy = spyOn(component, 'editMenu');
      fixture.detectChanges();
       fixture.whenStable().then(() => {
        const dropDown = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[0];
        dropDown.children[0].nativeElement.click();
        expect(mockSpy).toHaveBeenCalledTimes(1);
       })
       done();
    });

    it('should click saveEditedMenu button and call saveEditedMenu()', () => {
      let mockSpy = spyOn(component, "saveEditedMenu");
      menuServiceMock = jasmine.createSpyObj('MenuService', ['updateMenu']);
      menuServiceMock.updateMenu(menu);
      dh.clickButton("Spara uppdaterad matsedel");
      expect(mockSpy).toHaveBeenCalledTimes(1);
      expect(menuServiceMock.updateMenu).toHaveBeenCalledTimes(1);
    });
  });
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
  updateMenu(menu : Menu) : Observable<Menu> {
    return of(new MenuMockup().getMenu())
  }

  getMenus() {
    return of([new MenuMockup().getMenu()])
  }
}
