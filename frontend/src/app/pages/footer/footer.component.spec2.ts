import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { AuthService } from '@auth0/auth0-angular';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { FooterComponent } from './footer.component';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({template: ''})
class TempRouter{}
class AuthServiceStub {
  //is authicated is needed to so we can test from a logged in page
  isAuthenticated$ : Observable<boolean>;
  constructor () {
    this.isAuthenticated$ = of(true);
  }
}

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes(
        [
          { path:'admin', component: TempRouter},
          {path: 'home', component: TempRouter}
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

  it('should navigate to /home on first button click', fakeAsync(() => {


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


  }));
  it('should navigate to /admin on second button click', fakeAsync(() => {
    const location=TestBed.inject(Location);
    const administrera = fixture.debugElement.queryAll(By.css('button'));
    if(expect(administrera[1].nativeNode.outerText).toBe("Administrera")){
      const nativeButton: HTMLButtonElement=administrera[1].nativeElement;
      nativeButton.click();
      fixture.detectChanges();
      fixture.whenStable().then(()=>{
      expect(location.path()).toBe('/admin')

    })
  }

}));
});
