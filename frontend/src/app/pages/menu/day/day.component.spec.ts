import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuMockup } from 'src/app/mockups/menu-mockup';

import { DayComponent } from './day.component';

describe('DayComponent', () => {
  let component: DayComponent;
  let fixture: ComponentFixture<DayComponent>;
  let menuMockup : MenuMockup = new MenuMockup();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayComponent ],
      providers: [ {DatePipe} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should return foodspec', () => {
    expect(component.getFoodSpecs(menuMockup.getMenu().meals[0])).toContain('Fläsk');
  });

});
