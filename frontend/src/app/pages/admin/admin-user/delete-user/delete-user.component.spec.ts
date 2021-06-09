import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserComponent } from './delete-user.component';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, of } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Alert } from 'src/assets/alert';

describe('DeleteUserComponent', () => {
  let component: DeleteUserComponent;
  let fixture: ComponentFixture<DeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUserComponent ],
      providers: [
        {provide: AuthService, useClass: AuthServiceStub},
        {provide : UserService, useClass: UserServiceStub},
        {provide: Alert, useClass: AlertStub},
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUserComponent);
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

class UserServiceStub {
  getUsers() {

  }
}
