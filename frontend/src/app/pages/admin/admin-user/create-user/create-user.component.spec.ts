import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Alert } from 'src/assets/alert';
import { MunicipalityService } from 'src/app/services/municipality.service';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserComponent ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        {provide : UserService, useClass: UserServiceStub},
        {provide: Alert, useClass: AlertStub},
        {provide: MunicipalityService, useClass: MunicipalityServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Create', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });


});

class AlertStub {
  showAdvancedAlert() {
    //Mockup på Alert. Skickar tillbaka ett object med isConfirmed = true. isConfirmed används
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

class AuthServiceStub {
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

class UserServiceStub {

}

class MunicipalityServiceStub {
  getSchools() {
    return of([]);
  }
}
