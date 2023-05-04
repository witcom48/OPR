import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculationperiodComponent } from './calculationperiod.component';

describe('CalculationperiodComponent', () => {
  let component: CalculationperiodComponent;
  let fixture: ComponentFixture<CalculationperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculationperiodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculationperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
