import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetpolComponent } from './setpol.component';

describe('SetpolComponent', () => {
  let component: SetpolComponent;
  let fixture: ComponentFixture<SetpolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetpolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetpolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
