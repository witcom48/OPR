import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemReasonComponent } from './system-reason.component';

describe('SystemReasonComponent', () => {
  let component: SystemReasonComponent;
  let fixture: ComponentFixture<SystemReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemReasonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
