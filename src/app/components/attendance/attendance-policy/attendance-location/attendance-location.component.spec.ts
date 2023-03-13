import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceLocationComponent } from './attendance-location.component';

describe('AttendanceLocationComponent', () => {
  let component: AttendanceLocationComponent;
  let fixture: ComponentFixture<AttendanceLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceLocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
