import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProShiftComponent } from './pro-shift.component';

describe('ProShiftComponent', () => {
  let component: ProShiftComponent;
  let fixture: ComponentFixture<ProShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProShiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
