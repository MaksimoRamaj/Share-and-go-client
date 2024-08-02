import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeturatComponent } from './veturat.component';

describe('VeturatComponent', () => {
  let component: VeturatComponent;
  let fixture: ComponentFixture<VeturatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeturatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeturatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
