import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundtripsComponent } from './foundtrips.component';

describe('FoundtripsComponent', () => {
  let component: FoundtripsComponent;
  let fixture: ComponentFixture<FoundtripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoundtripsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FoundtripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
