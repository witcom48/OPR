import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfOvertimeComponent } from './self-overtime.component';

describe('SelfOvertimeComponent', () => {
  let component: SelfOvertimeComponent;
  let fixture: ComponentFixture<SelfOvertimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfOvertimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfOvertimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
