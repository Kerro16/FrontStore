import { TestBed } from '@angular/core/testing';

import { AuthstatusserviceService } from './authstatusservice.service';

describe('AuthstatusserviceService', () => {
  let service: AuthstatusserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthstatusserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
