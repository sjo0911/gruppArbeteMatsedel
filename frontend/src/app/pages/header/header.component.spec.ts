import { RouterTestingModule } from '@angular/router/testing';
import { MunicipalityService } from './../../services/municipality.service';
import { Alert } from 'src/assets/alert';
import { MenuService } from './../../services/menu.service';
import { MenuMockup } from './../../mockups/menu-mockup';
import { Menu } from './../../models/menu';
import { Observable, of } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { DOMHelper } from 'src/app/mockups/DOM-helper';
import { By } from '@angular/platform-browser';
import { AuthService } from '@auth0/auth0-angular';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let dh: DOMHelper<HeaderComponent>;
  let municipalityServiceMock: any;
  let sharingServiceMock: any;
  let dateHandlerServiceMock: any;

  beforeEach(async () => {
    municipalityServiceMock = jasmine.createSpyObj('MunicipalityService', ['getMunicipalities']);
    municipalityServiceMock.getMunicipalities.and.returnValue(of([]));

    sharingServiceMock = jasmine.createSpyObj('SharingService', ['setMenu']);

    dateHandlerServiceMock = jasmine.createSpyObj('DateHandlerService', ['getWeeks']);
    dateHandlerServiceMock.getWeeks.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [
        RouterTestingModule.withRoutes(
          [
          { path:'Fyll i path!', component: DummyComponent},
          ]
        )
      ],
      providers: [
        {provide: MenuService, useClass: MenuServiceStub},
        {provide: Alert, useClass: AlertStub},
        {provide: MunicipalityService, useValue: municipalityServiceMock},
        {provide: AuthService, useClass: AuthServiceStub}
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
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
    it('should contain two buttons', () => {
      expect(dh.countFromTagName('button')).toEqual(2);
    });
  });

  describe('Check ngOnInit', () => {
    // it('should call getMunicipalities() from municipalityService on NgOnInit()', () => {
    //   expect(component.$municipalities).toBeDefined();
    //   expect(component.$municipalities).not.toBeNull();
    //   expect(municipalityServiceMock.getMunicipalities).toHaveBeenCalledTimes(1);
    // });
  });

  describe('Check methods when dropdown is clicked', () => {
    it('should call method chooseMunicipality() when a municipality is clicked in dropdown', (done) => {
      spyOn(component, 'chooseMunicipality');
      component.$municipalities = of([
        {_id:'abc', municipalityName: 'Skellefteå', schools: [{_id:'abc123', schoolName:'Balderskolan', _menuId:'123'}]},
        {_id:'abc', municipalityName: 'Umeå', schools: [{_id:'cde456', schoolName:'Dragonskolan', _menuId:'123'}]}]);
         fixture.detectChanges();
         fixture.whenStable().then(() => {
          const dropDown = fixture.debugElement.queryAll(By.css('select'))[0];
          dropDown.nativeNode.options[1].click();
          dropDown.nativeNode.dispatchEvent(new Event('change'));
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.chooseMunicipality).toHaveBeenCalledTimes(1);
           });
         });
         done();
    });
  });

  describe('Check correct input to methods', () => {
    it('should call method chooseMunicipality() with chosen(first) municipality', (done) => {
      spyOn(component, 'chooseMunicipality');
      component.$municipalities = of([
        {_id:'abc', municipalityName: 'Skellefteå', schools: [{_id:'abc123', schoolName:'Balderskolan', _menuId:'123'}]},
        {_id:'abc', municipalityName: 'Umeå', schools: [{_id:'cde456', schoolName:'Dragonskolan', _menuId:'123'}]}]);
         fixture.detectChanges();
         fixture.whenStable().then(() => {
          const dropDownMunicipalities = fixture.debugElement.queryAll(By.css('select'))[0];
          dropDownMunicipalities.nativeNode.options[1].click();
          dropDownMunicipalities.nativeNode.dispatchEvent(new Event('change'));
          expect(dropDownMunicipalities.children.length).toBe(3);
          // dropDownMunicipalities.children[0].nativeElement.click();
          fixture.detectChanges();
          fixture.whenStable().then(() => {
            expect(component.chooseMunicipality).toHaveBeenCalledTimes(1);
            // expect(component.chosenMunicipality.municipalityName).toBe('Skellefteå');
           });
         });
         done();
    });

    // it('should call method chooseSchool() with chosen school when a school is clicked in dropdown', (done) => {
    //   spyOn(component, 'chooseSchool');
    //   component.$municipalities = of([
    //     {_id:'abc', municipalityName: 'Skellefteå', schools: [{_id:'abc123', schoolName:'Balderskolan', _menuId:'123'}]},
    //     {_id:'abc', municipalityName: 'Umeå', schools: [{_id:'cde456', schoolName:'Dragonskolan', _menuId:'123'}]}]);
    //      fixture.detectChanges();
    //      fixture.whenStable().then(() => {
    //       const dropDownMunicipalities = fixture.debugElement.queryAll(By.css('select'))[0];
    //       dropDownMunicipalities.nativeNode.options[1].click();
    //       dropDownMunicipalities.nativeNode.dispatchEvent(new Event('change'));
    //       expect(dropDownMunicipalities.children.length).toBe(3);
    //       fixture.detectChanges();
    //       fixture.whenStable().then(() => {
    //         expect(component.chosenMunicipality.municipalityName).toBe('Skellefteå');
    //         const dropDownSchools = fixture.debugElement.queryAll(By.css('select'))[1];
    //         dropDownSchools.nativeNode.options[1].click();
    //         dropDownSchools.nativeNode.dispatchEvent(new Event('change'));
    //         expect(dropDownSchools.children.length).toBe(2);
    //         fixture.detectChanges();
    //         fixture.whenStable().then(() => {
    //           expect(component.chooseSchool).toHaveBeenCalledTimes(1);

    //         });
    //        });
    //      });
    //      done();
    // });

  //   it('should call method chooseWeek() with chosen week when a week is clicked in dropdown', (done) => {
  //     spyOn(component, 'chooseWeek');
  //     component.$municipalities = of([
  //       {_id:'abc', municipalityName: 'Skellefteå', schools: [{_id:'abc123', schoolName:'Balderskolan', _menuId:'123'}]},
  //       {_id:'abc', municipalityName: 'Umeå', schools: [{_id:'cde456', schoolName:'Dragonskolan', _menuId:'123'}]}]);
  //     component.weeks = [{startDate: new Date('2021-05-24'), endDate: new Date('2021-05-30'), weekNr: '21', days: []}];
  //        fixture.detectChanges();
  //        fixture.whenStable().then(() => {
  //         const dropDownMunicipalities = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[0];
  //         dropDownMunicipalities.children[0].nativeElement.click();
  //         expect(dropDownMunicipalities.children.length).toBe(2);
  //         fixture.detectChanges();
  //         fixture.whenStable().then(() => {
  //           const dropDownSchools = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[1];
  //           expect(dropDownSchools.children.length).toBe(1);
  //           dropDownSchools.children[0].nativeElement.click();
  //           fixture.detectChanges();
  //           fixture.whenStable().then(() => {
  //             const dropDownWeeks = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[2];
  //             dropDownWeeks.children[0].nativeElement.click();
  //             fixture.detectChanges();
  //             fixture.whenStable().then(() => {
  //               expect(component.chooseWeek).toHaveBeenCalledTimes(1);
  //               expect(component.chooseWeek).toHaveBeenCalledWith(component.weeks[0]);
  //             });
  //           });
  //          });
  //        });
  //        done();
  //   });
  });





  // it('should call dateHandlerService.getWeeks() in chooseSchool() when school is chosen in dropdown', (done) => {
  //   component.municipalities = [
  //     {_id:'abc', municipalityName: 'Skellefteå', schools: [{_id:'abc123', schoolName:'Balderskolan', _menuId:'123'}]}];
  //      fixture.detectChanges();
  //      fixture.whenStable().then(() => {
  //       const dropDownMunicipalities = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[0];
  //       dropDownMunicipalities.children[0].nativeElement.click();
  //       fixture.detectChanges();
  //       fixture.whenStable().then(() => {
  //         const dropDownSchools = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[1];
  //         dropDownSchools.children[0].nativeElement.click();
  //         fixture.detectChanges();
  //         fixture.whenStable().then(() => {
  //           expect(dateHandlerServiceMock.getWeeks).toHaveBeenCalledTimes(1);
  //         });
  //        });
  //      });
  //      done();
  // });

  // it('should call sharingService.setMenu() in chooseSchool() when school is chosen in dropdown', () => {
  // });

  describe('Check methods when buttons are clicked', () => {
    it('should call previousWeekClick() when "paginatorLeft" button is clicked', () => {
      spyOn(component, 'previousWeekClick');
      dh.clickButton('<');
      expect(component.previousWeekClick).toHaveBeenCalledTimes(1);
    });

    it('should call nextWeekClick() when "paginatorRight" button is clicked', () => {
      spyOn(component, 'nextWeekClick');
      dh.clickButton('>');
      expect(component.nextWeekClick).toHaveBeenCalledTimes(1);
    });
  });

});

class AuthServiceStub{
  user$ : Observable<any>;
  isAuthenticated$ : Observable<any>;
  constructor () {
    this.isAuthenticated$ = of(true);
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

class MenuServiceStub {
  getMenus() : Observable<Menu> {
    return of(new MenuMockup().getMenu())
  }
}

class DummyComponent {
}
