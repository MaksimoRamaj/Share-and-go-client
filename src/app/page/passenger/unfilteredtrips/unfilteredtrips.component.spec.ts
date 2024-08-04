import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfilteredtripsComponent } from './unfilteredtrips.component';

describe('UnfilteredtripsComponent', () => {
  let component: UnfilteredtripsComponent;
  let fixture: ComponentFixture<UnfilteredtripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnfilteredtripsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnfilteredtripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
