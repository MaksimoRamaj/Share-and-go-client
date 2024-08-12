import { TestBed } from '@angular/core/testing';

import { ReviewformService } from './reviewform.service';

describe('ReviewformService', () => {
  let service: ReviewformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
