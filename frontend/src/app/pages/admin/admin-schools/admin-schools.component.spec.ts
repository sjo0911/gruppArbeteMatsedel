import { Observable, of } from 'rxjs';
import { MenuService } from './../../../services/menu.service';
import { MunicipalityService } from './../../../services/municipality.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminSchoolsComponent } from './admin-schools.component';
import { Municipality } from 'src/app/models/municipality';

describe('AdminSchoolsComponent', () => {
  let component: AdminSchoolsComponent;
  let fixture: ComponentFixture<AdminSchoolsComponent>;
  let mockMenuService : MenuService;
  let mockMunicipalityService : MunicipalityService;

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
    mockMenuService = TestBed.inject(MenuService);
    mockMunicipalityService = TestBed.inject(MunicipalityService);
  });

  describe('Create', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Check ngOnInit methods', () => {
    it('should call NgOnInit() & getMunicipalities()', () => {
      component.ngOnInit();
      expect(component.municipalities).toBeDefined();
      expect(component.municipalities).not.toBeNull();
      expect(component.municipalities).toEqual([]);
    });

    it('should call NgOnInit() & getMenus()', () => {
      component.ngOnInit();
      expect(component.menus).toBeDefined();
      expect(component.menus).not.toBeNull();
      expect(component.menus).toEqual([]);
    });
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
