import { Observable, of } from 'rxjs';
import { MenuService } from './../../../services/menu.service';
import { MunicipalityService } from './../../../services/municipality.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSchoolsComponent } from './admin-schools.component';
import { Municipality } from 'src/app/models/municipality';

describe('AdminSchoolsComponent', () => {
  let component: AdminSchoolsComponent;
  let fixture: ComponentFixture<AdminSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSchoolsComponent ],
      providers: [
        {provide: MunicipalityService, useClass: MunicipalityServiceStub},
        {provide: MenuService, useClass: MenuServiceStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MunicipalityServiceStub {
  getMunicipalities() {
    return of([]);
  }

}

class MenuServiceStub {
  getMenus() {
    return of([])
  }
}
