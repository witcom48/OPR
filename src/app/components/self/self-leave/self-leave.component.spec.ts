import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfLeaveComponent } from './self-leave.component';

describe('SelfLeaveComponent', () => {
  let component: SelfLeaveComponent;
  let fixture: ComponentFixture<SelfLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
