import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalresultComponent } from './attendance-summary.component';

describe('CalresultComponent', () => {
  let component: CalresultComponent;
  let fixture: ComponentFixture<CalresultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalresultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
