import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetLateComponent } from './set-late.component';

describe('SetLateComponent', () => {
  let component: SetLateComponent;
  let fixture: ComponentFixture<SetLateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetLateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetLateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
