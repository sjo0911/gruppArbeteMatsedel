import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenusComponent } from './admin-menus.component';

describe('AdminMenusComponent', () => {
  let component: AdminMenusComponent;
  let fixture: ComponentFixture<AdminMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenusComponent ],
      providers: [ {HttpClient} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
