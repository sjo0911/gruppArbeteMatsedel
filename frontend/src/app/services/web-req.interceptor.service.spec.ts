import { TestBed } from '@angular/core/testing';

import { WebReqInterceptorService } from './web-req.interceptor.service';

describe('WebReq.InterceptorService', () => {
  let service: WebReqInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebReqInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
