import { TestBed } from '@angular/core/testing';

import { ActivetripsService } from './activetrips.service';

describe('ActivetripsService', () => {
  let service: ActivetripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivetripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
