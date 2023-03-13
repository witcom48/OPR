import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetOvertimeComponent } from './set-overtime.component';

describe('SetOvertimeComponent', () => {
  let component: SetOvertimeComponent;
  let fixture: ComponentFixture<SetOvertimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetOvertimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
