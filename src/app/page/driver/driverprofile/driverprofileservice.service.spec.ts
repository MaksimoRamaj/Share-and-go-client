import { TestBed } from '@angular/core/testing';

import { DriverprofileserviceService } from './driverprofileservice.service';

describe('DriverprofileserviceService', () => {
  let service: DriverprofileserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverprofileserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
