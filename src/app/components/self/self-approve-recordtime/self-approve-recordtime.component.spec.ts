import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfApproveRecordtimeComponent } from './self-approve-recordtime.component';

describe('SelfApproveRecordtimeComponent', () => {
  let component: SelfApproveRecordtimeComponent;
  let fixture: ComponentFixture<SelfApproveRecordtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfApproveRecordtimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfApproveRecordtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
