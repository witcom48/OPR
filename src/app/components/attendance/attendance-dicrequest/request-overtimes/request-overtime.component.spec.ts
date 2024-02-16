import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestOvertimeComponent } from './request-overtime.component';

describe('RequestOvertimeComponent', () => {
  let component: RequestOvertimeComponent;
  let fixture: ComponentFixture<RequestOvertimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestOvertimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
 