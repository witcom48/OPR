import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsetgroupComponent } from './empsetgroup.component';

describe('EmpsetgroupComponent', () => {
  let component: EmpsetgroupComponent;
  let fixture: ComponentFixture<EmpsetgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsetgroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpsetgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
