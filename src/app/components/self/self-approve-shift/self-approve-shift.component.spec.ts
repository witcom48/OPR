import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfApproveShiftComponent } from './self-approve-shift.component';

describe('SelfApproveShiftComponent', () => {
  let component: SelfApproveShiftComponent;
  let fixture: ComponentFixture<SelfApproveShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfApproveShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfApproveShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
