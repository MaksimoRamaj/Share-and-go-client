import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtriplistComponent } from './ptriplist.component';

describe('PtriplistComponent', () => {
  let component: PtriplistComponent;
  let fixture: ComponentFixture<PtriplistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PtriplistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtriplistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
