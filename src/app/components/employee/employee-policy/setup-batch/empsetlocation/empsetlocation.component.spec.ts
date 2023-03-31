import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsetlocationComponent } from './empsetlocation.component';

describe('EmpsetlocationComponent', () => {
  let component: EmpsetlocationComponent;
  let fixture: ComponentFixture<EmpsetlocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsetlocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsetlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
