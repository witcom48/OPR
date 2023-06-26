import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsettrainingComponent } from './empsettraining.component';

describe('EmpsettrainingComponent', () => {
  let component: EmpsettrainingComponent;
  let fixture: ComponentFixture<EmpsettrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsettrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsettrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
