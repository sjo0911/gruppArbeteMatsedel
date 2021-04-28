import { TestBed } from '@angular/core/testing';

import { WebReqService } from './web-req.service';

describe('WebReqService', () => {
  let service: WebReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
