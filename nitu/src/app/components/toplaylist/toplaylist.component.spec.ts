import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToplaylistComponent } from './toplaylist.component';

describe('ToplaylistComponent', () => {
  let component: ToplaylistComponent;
  let fixture: ComponentFixture<ToplaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToplaylistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToplaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
