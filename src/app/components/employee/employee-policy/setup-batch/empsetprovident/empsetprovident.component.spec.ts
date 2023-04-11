import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsetprovidentComponent } from './empsetprovident.component';

describe('EmpsetprovidentComponent', () => {
  let component: EmpsetprovidentComponent;
  let fixture: ComponentFixture<EmpsetprovidentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsetprovidentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsetprovidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
