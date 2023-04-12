import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsetsalaryComponent } from './empsetsalary.component';

describe('EmpsetsalaryComponent', () => {
  let component: EmpsetsalaryComponent;
  let fixture: ComponentFixture<EmpsetsalaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsetsalaryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsetsalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
