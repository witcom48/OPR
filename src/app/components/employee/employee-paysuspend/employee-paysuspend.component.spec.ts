import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePaysuspendComponent } from './employee-paysuspend.component';

describe('EmployeePaysuspendComponent', () => {
  let component: EmployeePaysuspendComponent;
  let fixture: ComponentFixture<EmployeePaysuspendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePaysuspendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePaysuspendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
