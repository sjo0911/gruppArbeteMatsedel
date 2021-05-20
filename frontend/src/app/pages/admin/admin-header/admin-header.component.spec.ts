import { DOMHelper } from './../../../mockups/DOMHelper';
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { AuthService } from '@auth0/auth0-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeaderComponent } from './admin-header.component';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

describe('AdminHeaderComponent', () => {
  let component: AdminHeaderComponent;
  let fixture: ComponentFixture<AdminHeaderComponent>;
  let dh: DOMHelper<AdminHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHeaderComponent ],
      imports: [
        RouterTestingModule.withRoutes(
          [
          { path:'adminMenus', component: DummyComponent},
          { path:'adminSchools', component: DummyComponent},
          { path:'adminMeals', component: DummyComponent}
          ]
        )
      ],
      providers:  [
        {provide: AuthService, useClass: AuthServiceStub}
      ]
    })

    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dh = new DOMHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 3 buttons', () => {
    expect(dh.countFromTagName("button")).toEqual(3);
  })

  it('first button should have text: "Administrera matsedel"', () => {
    expect(dh.singleTextFromTagName("button")).toBe(" Administrera matsedel ");
  })

  it('second button should have text: "Administrera skola"', () => {
    expect(dh.getSpecificElement("button", 1).textContent).toBe(" Administrera skola ");
  })

  it('third button should have text: "Administrera maträtter"', () => {
    expect(dh.getSpecificElement("button", 2).textContent).toBe(" Administrera maträtter ");
  })

  it('should be in root before buttonclick', () => {
    const location = TestBed.inject(Location);
    expect(location.path()).toBe('');
  })

  it('first button should navigate to /adminMenus', (done) => {
    const location = TestBed.inject(Location);
    dh.getSpecificElement("button", 0).click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/adminMenus');
    })
    done();

  })

  it('second button should navigate to /adminSchools', (done) => {
    const location = TestBed.inject(Location);
    dh.getSpecificElement("button", 1).click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/adminSchools');
    })
    done();
  })

  it('third button should navigate to /adminMeals', (done) => {
    const location = TestBed.inject(Location);
    dh.getSpecificElement("button", 2).click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/adminMeals');
    })
    done();
  })

});

@Component({template: ''})
class DummyComponent {}

class AuthServiceStub {
  isAuthenticated$ : Observable<boolean>;
  constructor () {
    this.isAuthenticated$ = of(true);
  }
}
