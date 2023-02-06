import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpstatusComponent } from './empstatus.component';

describe('EmpstatusComponent', () => {
  let component: EmpstatusComponent;
  let fixture: ComponentFixture<EmpstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpstatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
