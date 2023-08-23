import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanReduceComponent } from './plan-reduce.component';

describe('PlanReduceComponent', () => {
  let component: PlanReduceComponent;
  let fixture: ComponentFixture<PlanReduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanReduceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanReduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
