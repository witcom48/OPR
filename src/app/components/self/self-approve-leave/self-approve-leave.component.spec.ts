import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfApproveLeaveComponent } from './self-approve-leave.component';

describe('SelfApproveLeaveComponent', () => {
  let component: SelfApproveLeaveComponent;
  let fixture: ComponentFixture<SelfApproveLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfApproveLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfApproveLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
