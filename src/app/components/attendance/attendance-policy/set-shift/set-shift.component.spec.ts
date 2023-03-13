import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetShiftComponent } from './set-shift.component';

describe('SetShiftComponent', () => {
  let component: SetShiftComponent;
  let fixture: ComponentFixture<SetShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
