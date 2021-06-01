import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { FooterComponent } from './footer.component';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes(
        [
          { path:'authLogin', component: TempRouter},
          {path: 'home', component: TempRouter},
          {path: '', component: TempRouter}
        ]
      )],
      providers:[
        {provide: AuthService, useClass: AuthServiceStub}
      ],
      declarations: [
        FooterComponent
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    //router = TestBed.inject(Router);
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should navigate to / before fisrt button click', fakeAsync(() => {
    const location=TestBed.inject(Location);
    const loginButton = fixture.debugElement.queryAll(By.css('button'));
    if(expect(loginButton[0].nativeNode.outerText).toBe("Logga in")){
      expect(location['$$path']()).toBe('');
    }

  }));
  it('should navigate to /authLogin on first button click', fakeAsync(() => {

    const location=TestBed.inject(Location);
    const loginButton = fixture.debugElement.queryAll(By.css('button'));
    if(expect(loginButton[0].nativeNode.outerText).toBe("Logga in")){
      const nativeButton: HTMLButtonElement=loginButton[0].nativeElement;
      nativeButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(()=>{
      expect(location.path()).toBe('authLogin')
    })
    }
  }));
  /*it('should navigate to /home on first button click', fakeAsync(() => {

    const location=TestBed.inject(Location);
    const loginButton = fixture.debugElement.queryAll(By.css('button'));
    if(expect(loginButton[0].nativeNode.outerText).toBe("Logga ut")){
      const nativeButton: HTMLButtonElement=loginButton[0].nativeElement;
      nativeButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(()=>{
      expect(location.path()).toBe('home')
    })
    }

  }));*/
});

@Component({template: ''})

class TempRouter{}

class AuthServiceStub{
  // user$ : Observable<any>;
  constructor () {
    // this.user$ = of({
    //   "firstName": "Jakob",
    //   "lastName": "Öhlén",
    //   "email": "kungen@hubbahubba.com",
    //   "schoolIds": [],
    //   "permissions": ["admin"],
    //   "menuId": []});
  }
}
