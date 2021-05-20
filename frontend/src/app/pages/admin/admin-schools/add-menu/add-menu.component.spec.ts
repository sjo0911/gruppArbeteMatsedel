import { DOMHelper } from './../../../../mockups/DOMHelper';
import { Alert } from 'src/assets/alert';
import { MunicipalityService } from './../../../../services/municipality.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuComponent } from './add-menu.component';
import { By } from '@angular/platform-browser';

describe('AddMenuComponent', () => {
  let component: AddMenuComponent;
  let fixture: ComponentFixture<AddMenuComponent>;
  let dh: DOMHelper<AddMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuComponent ],
      providers: [
        {provide: MunicipalityService, useClass: MunicipalityServiceStub},
        {provide: Alert, useClass: AlertStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    dh = new DOMHelper(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should countain a button with text: " Lägg till/ uppdatera matsedeln till skolan "', () => {
   expect(dh.singleTextFromTagName('button')).toBe(" Lägg till/ uppdatera matsedeln till skolan ");
  })

  it('should contain 3 dropdowns', () => {
    expect(dh.countFromTagName("a.navbar-link")).toEqual(3);
  })

  it('first dropdown should contain 2 municipalities', (done) => {
    component.municipalities = [
    {_id:'abc', municipalityName: 'Skellefteå', schools: [{_id:'abc123', schoolName:'Balderskolan', _menuId:'123'}]},
     {_id:'abc', municipalityName: 'Umeå', schools: [{_id:'cde456', schoolName:'Dragonskolan', _menuId:'123'}]}];
     fixture.detectChanges();
     fixture.whenStable().then(() => {
      const dropDown = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[0];
      expect(dropDown.children.length).toBe(2);
     });
     done();
  })

  it('when first municipality is selected that municipalitys school should be avalible in next dropdown', (done) => {
    component.municipalities = [
    {_id:'abc', municipalityName: 'Skellefteå', schools: [{_id:'abc123', schoolName:'Balderskolan', _menuId:'123'}]},
     {_id:'abc', municipalityName: 'Umeå', schools: [{_id:'cde456', schoolName:'Dragonskolan', _menuId:'123'}]}];
     fixture.detectChanges();
     fixture.whenStable().then(() => {
      const dropDown = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[0];
      dropDown.children[0].nativeElement.click();
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const dropDown2 = fixture.debugElement.queryAll(By.css('div.navbar-dropdown'))[1];
        expect(dropDown2.children.length).toBe(1)
       })
     });
     done();
  })

  it('Should have 3 menus in Menu dropdown', (done) => {
    component.menus = [
      {_id: '1', menuName: "menu1", startDate: new Date("2021-05-20"), endDate: new Date("2021-05-27"), meals: []},
      {_id: '2', menuName: "menu2", startDate: new Date("2021-05-20"), endDate: new Date("2021-05-27"), meals: []},
     {_id: '3', menuName: "menu3", startDate: new Date("2021-05-20"), endDate: new Date("2021-05-27"), meals: []}
    ];
     fixture.detectChanges();
     fixture.whenStable().then(() => {
      expect(dh.countFromTagName("a.navbar-item.menuDropDown")).toBe(3);
     })
     done();
  })
});

class MunicipalityServiceStub {

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


