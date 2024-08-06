import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovecarformComponent } from './removecarform.component';

describe('RemovecarformComponent', () => {
  let component: RemovecarformComponent;
  let fixture: ComponentFixture<RemovecarformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemovecarformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovecarformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
