import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { DOMHelper } from 'src/app/mockups/DOM-helper';

import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;
  let helpers: DOMHelper<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoutComponent ],
      imports: [
        RouterTestingModule
      ],
      providers:  [
        {provide: AuthService, useClass: AuthServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    helpers= new DOMHelper(fixture);
  });
/*
  it('"Till startsidan" button should navigate to /', (done) => {
    const router = TestBed.get(Router);
    spyOn(router, 'navigateByUrl');
    helpers.clickButton("Till startsidan");
    expect(router.navigateByUrl).
    toHaveBeenCalledWith(router.createUrlTree(['/']),{ skipLocationChange: false, replaceUrl: false, state: undefined});
    done();
  })*/
});

@Component({template: ''})
class AuthServiceStub {
  //is authicated is needed to so we can test from a logged in page
  isAuthenticated$ : Observable<boolean>;
  constructor () {
    this.isAuthenticated$ = of(true);
  }
}
