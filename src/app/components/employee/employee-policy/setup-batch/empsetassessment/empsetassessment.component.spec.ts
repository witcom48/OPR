import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsetassessmentComponent } from './empsetassessment.component';

describe('EmpsetassessmentComponent', () => {
  let component: EmpsetassessmentComponent;
  let fixture: ComponentFixture<EmpsetassessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsetassessmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsetassessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
