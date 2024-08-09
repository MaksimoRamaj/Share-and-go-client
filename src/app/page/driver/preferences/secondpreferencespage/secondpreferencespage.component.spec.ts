import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondpreferencespageComponent } from './secondpreferencespage.component';

describe('SecondpreferencespageComponent', () => {
  let component: SecondpreferencespageComponent;
  let fixture: ComponentFixture<SecondpreferencespageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecondpreferencespageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondpreferencespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
