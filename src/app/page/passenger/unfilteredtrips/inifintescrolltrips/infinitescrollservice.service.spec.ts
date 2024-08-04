import { TestBed } from '@angular/core/testing';

import { InfinitescrollserviceService } from './infinitescrollservice.service';

describe('InfinitescrollserviceService', () => {
  let service: InfinitescrollserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InfinitescrollserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
