import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayrollCalbonusComponent } from './payroll-calbonus.component';

describe('PayrollCalbonusComponent', () => {
  let component: PayrollCalbonusComponent;
  let fixture: ComponentFixture<PayrollCalbonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayrollCalbonusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayrollCalbonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
