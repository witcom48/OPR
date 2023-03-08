import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEmpComponent } from './select-emp.component';

describe('SelectEmpComponent', () => {
  let component: SelectEmpComponent;
  let fixture: ComponentFixture<SelectEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectEmpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
