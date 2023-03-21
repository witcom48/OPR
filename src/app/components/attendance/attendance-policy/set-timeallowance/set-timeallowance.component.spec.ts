import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTimeallowanceComponent } from './set-timeallowance.component';

describe('SetTimeallowanceComponent', () => {
  let component: SetTimeallowanceComponent;
  let fixture: ComponentFixture<SetTimeallowanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetTimeallowanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetTimeallowanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
