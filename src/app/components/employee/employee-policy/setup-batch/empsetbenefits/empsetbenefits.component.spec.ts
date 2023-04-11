import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsetbenefitsComponent } from './empsetbenefits.component';

describe('EmpsetbenefitsComponent', () => {
  let component: EmpsetbenefitsComponent;
  let fixture: ComponentFixture<EmpsetbenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsetbenefitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsetbenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
