import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfEmployeeComponent } from './self-employee.component';

describe('SelfEmployeeComponent', () => {
  let component: SelfEmployeeComponent;
  let fixture: ComponentFixture<SelfEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfEmployeeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
