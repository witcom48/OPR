import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeallowanceComponent } from './timeallowance.component';

describe('TimeallowanceComponent', () => {
  let component: TimeallowanceComponent;
  let fixture: ComponentFixture<TimeallowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeallowanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeallowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
