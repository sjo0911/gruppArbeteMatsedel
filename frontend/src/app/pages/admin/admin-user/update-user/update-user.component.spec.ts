import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserComponent } from './update-user.component';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Alert } from 'src/assets/alert';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { DOMHelper } from '../../../../mockups/DOM-helper';
import { By } from '@angular/platform-browser';

describe('UpdateUserComponent', () => {
  let component: UpdateUserComponent;
  let fixture: ComponentFixture<UpdateUserComponent>;
  let dh: DOMHelper<UpdateUserComponent>;
  let municipalityServiceMock: any;
  let userServiceMock: any;

  beforeEach(async () => {
    municipalityServiceMock = jasmine.createSpyObj('MunicipalityService', ['getSchools']);
    municipalityServiceMock.getSchools.and.returnValue(of([]));

    userServiceMock = jasmine.createSpyObj('UserService', ['getUsers']);
    userServiceMock.getUsers.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ UpdateUserComponent ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        {provide : UserService, useClass: UserServiceStub},
        {provide: Alert, useClass: AlertStub},
        {provide: MunicipalityService, useClass: MunicipalityServiceStub},
        {provide: MunicipalityService, useValue: municipalityServiceMock},
        {provide: UserService, useValue: userServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dh = new DOMHelper(fixture);
  });

  describe('Create', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('HTML', () => {
    it('should contain 4 inputs', () => {
      expect(dh.countFromTagName("input.input-field")).toEqual(4);
    });

    it('should contain button with text "Uppdatera användare"', () => {
      expect(dh.singleTextFromTagName("button")).toBe('Uppdatera användare');
    });
  });

  describe('Check methods when buttons are clicked', () => {
    it('should call updateUser() when "create-button" button is clicked', () => {
      spyOn(component, 'updateUser');
      dh.clickButton('Uppdatera användare');
      expect(component.updateUser).toHaveBeenCalledTimes(1);
    });

    it('should call clickAdmin() when "permission-checkbox" checkbox is clicked', () => {
      spyOn(component, 'clickAdmin');
      let input = fixture.debugElement.query(By.css('#admin')).nativeElement;
      expect(input.checked).toBeFalsy();
      input.click();
      fixture.detectChanges();
      expect(input.checked).toBeTruthy();
      expect(component.clickAdmin).toHaveBeenCalledTimes(1);
    });

  });

  describe('Check ngOnInit', () => {
    it('should call getSchools() from municipalityService on NgOnInit()', () => {
      expect(component.schoolsToChoose).toBeDefined();
      expect(component.schoolsToChoose).not.toBeNull();
      expect(municipalityServiceMock.getSchools).toHaveBeenCalledTimes(1);
    });

    it('should call getUsers() from userService on NgOnInit()', () => {
      expect(component.users).toBeDefined();
      expect(component.users).not.toBeNull();
      expect(userServiceMock.getUsers).toHaveBeenCalledTimes(1);
    });
  });

});

class AuthServiceStub{
  user$ : Observable<any>;
  constructor () {
    this.user$ = of({"picture": {
      "firstName": "Jakob",
      "lastName": "Öhlén",
      "email": "kungen@hubbahubba.com",
      "schoolIds": [],
      "permissions": ["admin"],
      "menuId": []}});
  }
}

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

class UserServiceStub {
  getUsers() {
    return of([]);
  }
}

class MunicipalityServiceStub {
  getSchools() {
    return of([]);
  }
}

