import { TestBed } from '@angular/core/testing';

import { TripserviceService } from './tripservice.service';

describe('TripserviceService', () => {
  let service: TripserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
