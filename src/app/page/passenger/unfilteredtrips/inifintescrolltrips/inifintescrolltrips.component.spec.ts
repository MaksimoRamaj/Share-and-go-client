import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InifintescrolltripsComponent } from './inifintescrolltrips.component';

describe('InifintescrolltripsComponent', () => {
  let component: InifintescrolltripsComponent;
  let fixture: ComponentFixture<InifintescrolltripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InifintescrolltripsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InifintescrolltripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
