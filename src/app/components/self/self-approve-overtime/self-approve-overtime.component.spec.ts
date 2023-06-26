import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfApproveOvertimeComponent } from './self-approve-overtime.component';

describe('SelfApproveOvertimeComponent', () => {
  let component: SelfApproveOvertimeComponent;
  let fixture: ComponentFixture<SelfApproveOvertimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfApproveOvertimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfApproveOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
