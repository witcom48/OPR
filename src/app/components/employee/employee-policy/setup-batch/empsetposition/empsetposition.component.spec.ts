import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsetpositionComponent } from './empsetposition.component';

describe('EmpsetpositionComponent', () => {
  let component: EmpsetpositionComponent;
  let fixture: ComponentFixture<EmpsetpositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsetpositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsetpositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
