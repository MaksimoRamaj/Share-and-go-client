import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindPostComponent } from './find-post.component';

describe('FindPostComponent', () => {
  let component: FindPostComponent;
  let fixture: ComponentFixture<FindPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
