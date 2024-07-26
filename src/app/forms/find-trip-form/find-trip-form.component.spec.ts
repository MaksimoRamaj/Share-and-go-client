import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindTripFormComponent } from './find-trip-form.component';

describe('FindTripFormComponent', () => {
  let component: FindTripFormComponent;
  let fixture: ComponentFixture<FindTripFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindTripFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FindTripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
