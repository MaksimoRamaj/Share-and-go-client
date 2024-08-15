import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointriprequestsComponent } from './jointriprequests.component';

describe('JointriprequestsComponent', () => {
  let component: JointriprequestsComponent;
  let fixture: ComponentFixture<JointriprequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JointriprequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JointriprequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
