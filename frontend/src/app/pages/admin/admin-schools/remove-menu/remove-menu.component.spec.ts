import { MunicipalityService } from './../../../../services/municipality.service';
import { Alert } from 'src/assets/alert';
import { MenuService } from './../../../../services/menu.service';
import { MenuMockup } from './../../../../mockups/menu-mockup';
import { Menu } from './../../../../models/menu';
import { Observable, of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveMenuComponent } from './remove-menu.component';
import { Municipality } from 'src/app/models/municipality';
import { By } from '@angular/platform-browser';
import { DOMHelper } from '../../../../mockups/DOM-helper';

describe('RemoveMenuComponent', () => {
  let component: RemoveMenuComponent;
  let fixture: ComponentFixture<RemoveMenuComponent>;
  let municipalitiesMockup = new Municipality();
  municipalitiesMockup = {_id: "123", municipalityName: "Umeå", schools: [{_id: "1", schoolName: "Dragonskolan", _menuId: "2"}]};
  let menuServiceStub : MenuService;
  let dh: DOMHelper<RemoveMenuComponent>;
  let menuServiceMock : MenuService;
  let municipalityServiceMock : MunicipalityService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveMenuComponent ],
      providers: [
        {provide: MenuService, useClass: MenuServiceStub},
        {provide: Alert, useClass: AlertStub}  ,
        {provide: MunicipalityService, useClass: MunicipalityServiceStub},
        {provide: MenuService, useValue: menuServiceMock},
        {provide: MunicipalityService, useValue: municipalityServiceMock}
      ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    menuServiceStub = TestBed.inject(MenuService);
    dh = new DOMHelper(fixture);
  });

  describe('Create', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Check methods when buttons are clicked', () => {
    it('should call chooseMunicipalityToDelete() when dropdown is clicked', (done) => {
      component.municipalities = [municipalitiesMockup];
      let mockSpy = spyOn(component, 'chooseMunicipalityToDelete');
      fixture.detectChanges();
       fixture.whenStable().then(() => {
        const dropDown = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[0];
        dropDown.children[0].nativeElement.click();
        expect(mockSpy).toHaveBeenCalledTimes(1);
       })
       done();
    });

    it('should call chooseSchoolToDelete()', (done) => {
      component.municipalities = [municipalitiesMockup];
      component.schoolToDelete = municipalitiesMockup.schools[0];
      let mockSpy = spyOn(component, 'chooseSchoolToDelete');
      menuServiceMock = jasmine.createSpyObj('MenuService', ['getMenuName']);
      menuServiceMock.getMenuName(municipalitiesMockup.schools[0]._id);
      fixture.detectChanges();
       fixture.whenStable().then(() => {
        const dropDown = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[0];
        dropDown.children[0].nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
       const dropDown2 = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[1];
       dropDown2.children[0].nativeElement.click();
       expect(mockSpy).toHaveBeenCalledTimes(1);
       expect(menuServiceMock.getMenuName).toHaveBeenCalledTimes(1);
      })
    })
      done();
    });

    it('should click deleteMenuFromSchool button and call deleteMenuFromSchool()', () => {
      component.schoolToDelete = municipalitiesMockup.schools[0];
      let mockSpy = spyOn(component, 'deleteMenuFromSchool');
      municipalityServiceMock = jasmine.createSpyObj('MunicipalityService', ['updateSchool']);
      municipalityServiceMock.updateSchool(municipalitiesMockup._id, municipalitiesMockup.schools[0]);
      dh.clickButton("Ta bort matsedel från skolan");
      expect(mockSpy).toHaveBeenCalledTimes(1);
      expect(municipalityServiceMock.updateSchool).toHaveBeenCalledTimes(1);
    });
  });
});


class AlertStub {
  showAdvancedAlert() {
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
  getMenuName(menuId : string) : Observable<Menu> {
    return of(new MenuMockup().getMenu())
  }
}

class MunicipalityServiceStub {
}

