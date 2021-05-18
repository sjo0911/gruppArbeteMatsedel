import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuMockup } from 'src/app/mockups/menu-mockup';

import { AdminMealsComponent } from './admin-meals.component';

import { SharingService } from 'src/app/services/sharing.service';
import { MenuService } from 'src/app/services/menu.service';
import { of, Subject } from 'rxjs';
import { Week } from 'src/app/models/week';
import { Menu } from 'src/app/models/menu';

describe('AdminComponent', () => {
  let component: AdminMealsComponent;
  let fixture: ComponentFixture<AdminMealsComponent>;

  let menuMockup : MenuMockup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMealsComponent ],
      providers: [
        {provide: SharingService, useClass: SharingServiceStub},
        {provide: MenuService, useClass: MenuServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    menuMockup = new MenuMockup();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should return true boolean if meal contains "pig"', () => {
    expect(component.checkFoodSpec(menuMockup.getMenu().meals[0].foodSpecs, "pig")).toBeTruthy();
  });

  it('should return false boolean if meal does not contain "veg"', () => {
    expect(component.checkFoodSpec(menuMockup.getMenu().meals[0].foodSpecs, "veg")).toBeFalsy();
  });

  // it('should contain a button with title "Uppdatera"', () => {
  //   const btn = fixture.debugElement.nativeElement.querySelector('#updateButton');
  //   expect(btn.title).toContain('Uppdatera');

  // });

});

class SharingServiceStub {
  getObservableWeek() : Subject<Week> {
    return new Subject();
  }

  getObservableMenu() : Subject<Menu> {
    return new Subject();
  }
}

class MenuServiceStub {

}
