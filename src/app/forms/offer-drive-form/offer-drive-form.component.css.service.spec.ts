import { TestBed } from '@angular/core/testing';

import { OfferDriveFormComponentCssService } from './offer-drive-form.component.css.service';

describe('OfferDriveFormComponentCssService', () => {
  let service: OfferDriveFormComponentCssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferDriveFormComponentCssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
