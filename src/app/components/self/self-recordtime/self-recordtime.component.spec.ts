import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfRecordtimeComponent } from './self-recordtime.component';

describe('SelfRecordtimeComponent', () => {
  let component: SelfRecordtimeComponent;
  let fixture: ComponentFixture<SelfRecordtimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfRecordtimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfRecordtimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
