import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrequestComponent } from './withdrequest.component';

describe('WithdrequestComponent', () => {
  let component: WithdrequestComponent;
  let fixture: ComponentFixture<WithdrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WithdrequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WithdrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
