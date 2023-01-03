import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceTimecardComponent } from './attendance-timecard.component';

describe('AttendanceTimecardComponent', () => {
  let component: AttendanceTimecardComponent;
  let fixture: ComponentFixture<AttendanceTimecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceTimecardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceTimecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
