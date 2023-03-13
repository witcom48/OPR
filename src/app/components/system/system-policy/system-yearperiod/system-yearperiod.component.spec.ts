import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemYearperiodComponent } from './system-yearperiod.component';

describe('SystemYearperiodComponent', () => {
  let component: SystemYearperiodComponent;
  let fixture: ComponentFixture<SystemYearperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemYearperiodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemYearperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
