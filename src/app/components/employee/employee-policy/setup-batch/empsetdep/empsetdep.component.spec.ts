import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsetdepComponent } from './empsetdep.component';

describe('EmpsetdepComponent', () => {
  let component: EmpsetdepComponent;
  let fixture: ComponentFixture<EmpsetdepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsetdepComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsetdepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
