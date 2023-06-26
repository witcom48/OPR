import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfApproveCheckinComponent } from './self-approve-checkin.component';

describe('SelfApproveCheckinComponent', () => {
  let component: SelfApproveCheckinComponent;
  let fixture: ComponentFixture<SelfApproveCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfApproveCheckinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfApproveCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
