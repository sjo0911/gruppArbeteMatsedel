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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveMenuComponent ],
      providers: [
        {provide: MenuService, useClass: MenuServiceStub},
        {provide: Alert, useClass: AlertStub}  ,
        {provide: MunicipalityService, useClass: MunicipalityServiceStub}, ],

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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

  // Lägg till för att kolla så att getMenuName i service också körs
  it('should call chooseSchoolToDelete()', (done) => {
    component.municipalities = [municipalitiesMockup];
    component.schoolToDelete = municipalitiesMockup.schools[0];
    let mockSpy = spyOn(component, 'chooseSchoolToDelete');
    fixture.detectChanges();
     fixture.whenStable().then(() => {
      const dropDown = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[0];
      dropDown.children[0].nativeElement.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
     const dropDown2 = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[1];
     dropDown2.children[0].nativeElement.click();
     expect(mockSpy).toHaveBeenCalledTimes(1);
    })
  })
    done();
  });

  it('should click deleteMenuFromSchool button and call deleteMenuFromSchool()', () => {
    component.schoolToDelete = municipalitiesMockup.schools[0];
    let mockSpy = spyOn(component, 'deleteMenuFromSchool');
    dh.clickButton("Ta bort matsedel från skolan");
    expect(mockSpy).toHaveBeenCalledTimes(1);
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
  getMenus() : Observable<Menu> {
    return of(new MenuMockup().getMenu())
  }
  getMenuName(menuId : string) : Observable<Menu> {
    return of(new MenuMockup().getMenu())
  }
}

class MunicipalityServiceStub {

}

