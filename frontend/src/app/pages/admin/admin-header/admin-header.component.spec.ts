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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain 3 buttons', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    expect(buttons.length).toEqual(3);
  })

  it('first button should have text: "Administrera matsedel"', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const firstButton = buttons[0];
    expect(firstButton.nativeNode.outerText).toBe("Administrera matsedel");
  })

  it('second button should have text: "Administrera skola"', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const secondButton = buttons[1];
    expect(secondButton.nativeNode.outerText).toBe("Administrera skola");
  })

  it('third button should have text: "Administrera maträtter"', () => {
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const thirdButton = buttons[2];
    expect(thirdButton.nativeNode.outerText).toBe("Administrera maträtter");
  })

  it('should be in root before buttonclick', () => {
    const location = TestBed.inject(Location);
    expect(location.path()).toBe('');
  })

  it('first button should navigate to /adminMenus', (done) => {
    const location = TestBed.inject(Location);
    const firstButton= fixture.debugElement.queryAll(By.css('button'))[0];
    firstButton.nativeNode.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/adminMenus');
    })
    done();

  })

  it('second button should navigate to /adminSchools', (done) => {
    const location = TestBed.inject(Location);
    const button = fixture.debugElement.queryAll(By.css('button'))[1];
    button.nativeNode.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(location.path()).toBe('/adminSchools');
    })
    done();
  })

  it('third button should navigate to /adminMeals', (done) => {
    const location = TestBed.inject(Location);
    const button = fixture.debugElement.queryAll(By.css('button'))[2];
    button.nativeNode.click();
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
