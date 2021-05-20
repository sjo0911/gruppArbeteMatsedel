import { Alert } from 'src/assets/alert';
import { MunicipalityService } from './../../../../services/municipality.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuComponent } from './add-menu.component';
import { By } from '@angular/platform-browser';

describe('AddMenuComponent', () => {
  let component: AddMenuComponent;
  let fixture: ComponentFixture<AddMenuComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should countain a button with text: "Lägg till matsedel till skolan"', () => {
    const buttonElement = fixture.debugElement.query(By.css('button'));
   expect(buttonElement.nativeNode.outerText).toBe("Lägg till/ uppdatera matsedeln till skolan");
  })

  it('should contain 3 dropdowns', () => {
    const dropDowns = fixture.debugElement.queryAll(By.css('a.navbar-link'));
    expect(dropDowns.length).toEqual(3);
    //expect(dropDowns)
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
