import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeshowComponent } from './likeshow.component';

describe('LikeshowComponent', () => {
  let component: LikeshowComponent;
  let fixture: ComponentFixture<LikeshowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LikeshowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikeshowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
