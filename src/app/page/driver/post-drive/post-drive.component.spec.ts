import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDriveComponent } from './post-drive.component';

describe('PostDriveComponent', () => {
  let component: PostDriveComponent;
  let fixture: ComponentFixture<PostDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostDriveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
