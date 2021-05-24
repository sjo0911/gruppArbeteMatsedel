import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { LoginFailedComponent } from './login-failed.component';
import { Router } from '@angular/router';
import { exception } from 'node:console';
import { DOMHelper } from 'src/app/mockups/DOM-helper';

class TempRouter{}

describe('LoginFailedComponent', () => {
  let component: LoginFailedComponent;
  let fixture: ComponentFixture<LoginFailedComponent>;
  let dh: DOMHelper<LoginFailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes(
        [
          { path:'loginFailed', component: TempRouter},
          { path: '', component: TempRouter}
        ]
      )],
      declarations: [ LoginFailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dh = new DOMHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a label with text "Inloggning misslyckades!"', () => {
    expect(dh.singleTextFromTagName("p").trim()).toBe("Inloggning misslyckades!");
  });

  it('should contain only one button', () => {
    expect(dh.countFromTagName("button")).toEqual(1);
  });

  it('should contain button with text "Till startsidan"', () => {
    expect(dh.singleTextFromTagName("button").trim()).toBe("Till startsidan");
  });

  it('should be in route / (/loginFailed) before first button click', () => {
    const location = TestBed.inject(Location);
    expect(location.path()).toBe('');

    // const button = fixture.debugElement.query(By.css('button'));
    // if(expect(button.nativeNode.outerText).toBe("Till startsidan")){
    //   expect(location.path()).toBe('loginFailed');
    // }

  });

  // it('should navigate to / on "Till startsidan" button click', () => {
  //   // const router = TestBed.inject(Router);
  //   // spyOn(router, 'navigateByUrl');
  //   // dh.clickButton('Till startsidan');
  //   // expect(router.navigateByUrl).toHaveBeenCalledWith(router.createUrlTree(['']), {skipLocationChange: false, replaceUrl: false, state: undefined});

  //   // done();

  //   // const location = TestBed.inject(Location);
  //   // const button = fixture.debugElement.queryAll(By.css('button'));
  //   // if(expect(button[0].nativeNode.outerText).toBe("Till startsidan")){
  //   //   const nativeButton: HTMLButtonElement=button[0].nativeElement;
  //   //   nativeButton.click();
  //   //   fixture.detectChanges();
  //   //   fixture.whenStable().then(()=>{
  //   //   expect(location.path()).toBe('')
  //   // })
  //   // }
  // });

});
