import { TestBed } from '@angular/core/testing';
import { Menu } from '../models/menu';
import { MenuMockup } from '../mockups/menu-mockup';
import { Week } from '../models/week';

import { DateHandlerService } from './date-handler.service';

describe('DateHandlerService', () => {
  let service: DateHandlerService;
  let menuMockup : MenuMockup;

  let weeks : Week[];

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(DateHandlerService);
    service = new DateHandlerService();

    menuMockup = new MenuMockup();
    weeks = service.getWeeks(menuMockup.getMenu());
  });

  it('should get previousWeek', () => {
    expect(service.getPreviousWeek(weeks, weeks[2])).toEqual(weeks[1]);
  });

  it('should not get previousWeek', () => {
    expect(service.getPreviousWeek(weeks, weeks[2]) === weeks[5]).toBeFalsy();
  });

  it('should get nextWeek', () => {
    expect(service.getNextWeek(weeks, weeks[2])).toEqual(weeks[3]);
  });

  it('should not get nextWeek', () => {
    expect(service.getNextWeek(weeks, weeks[2]) === weeks[5]).toBeFalsy();
  });

  it('should return current week', () => {
    const currentWeek = service.getCurrentWeek();
    expect(currentWeek).toEqual('20');
  });

  it('should return weeks', () => {
    expect(weeks.length).toEqual(7);
  });

});
