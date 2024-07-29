import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferDriveFormComponent } from './offer-drive-form.component';

describe('OfferDriveFormComponent', () => {
  let component: OfferDriveFormComponent;
  let fixture: ComponentFixture<OfferDriveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OfferDriveFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OfferDriveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
