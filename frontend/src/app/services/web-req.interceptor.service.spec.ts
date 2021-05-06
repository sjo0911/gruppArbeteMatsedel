import { TestBed } from '@angular/core/testing';

import { WebReq.InterceptorService } from './web-req.interceptor.service';

describe('WebReq.InterceptorService', () => {
  let service: WebReq.InterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebReq.InterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
