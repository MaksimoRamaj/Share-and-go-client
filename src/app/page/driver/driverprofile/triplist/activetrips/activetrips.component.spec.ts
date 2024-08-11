import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivetripsComponent } from './activetrips.component';

describe('ActivetripsComponent', () => {
  let component: ActivetripsComponent;
  let fixture: ComponentFixture<ActivetripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivetripsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivetripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
