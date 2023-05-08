import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePartComponent } from './employee-part.component';

describe('EmployeePartComponent', () => {
  let component: EmployeePartComponent;
  let fixture: ComponentFixture<EmployeePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
