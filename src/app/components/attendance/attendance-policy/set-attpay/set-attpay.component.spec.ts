import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAttpayComponent } from './set-attpay.component';

describe('SetAttpayComponent', () => {
  let component: SetAttpayComponent;
  let fixture: ComponentFixture<SetAttpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetAttpayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetAttpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
