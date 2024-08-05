import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RezervoformComponent } from './rezervoform.component';

describe('RezervoformComponent', () => {
  let component: RezervoformComponent;
  let fixture: ComponentFixture<RezervoformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RezervoformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RezervoformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
