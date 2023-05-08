import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeGroupComponent } from './employee-group.component';

describe('EmployeeGroupComponent', () => {
  let component: EmployeeGroupComponent;
  let fixture: ComponentFixture<EmployeeGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
