import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceApproveComponent } from './attendance-approve.component';

describe('AttendanceApproveComponent', () => {
  let component: AttendanceApproveComponent;
  let fixture: ComponentFixture<AttendanceApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttendanceApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
