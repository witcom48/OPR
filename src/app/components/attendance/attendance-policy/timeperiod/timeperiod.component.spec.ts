import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeperiodComponent } from './timeperiod.component';

describe('TimeperiodComponent', () => {
  let component: TimeperiodComponent;
  let fixture: ComponentFixture<TimeperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimeperiodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
