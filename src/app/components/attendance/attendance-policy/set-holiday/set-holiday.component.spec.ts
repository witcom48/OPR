import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetHolidayComponent } from './set-holiday.component';

describe('SetHolidayComponent', () => {
  let component: SetHolidayComponent;
  let fixture: ComponentFixture<SetHolidayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetHolidayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
