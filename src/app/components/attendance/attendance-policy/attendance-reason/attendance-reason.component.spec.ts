import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceReasonComponent } from './attendance-reason.component';

describe('AttendanceReasonComponent', () => {
  let component: AttendanceReasonComponent;
  let fixture: ComponentFixture<AttendanceReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
