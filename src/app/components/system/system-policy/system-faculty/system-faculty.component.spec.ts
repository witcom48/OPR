import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemFacultyComponent } from './system-faculty.component';

describe('SystemFacultyComponent', () => {
  let component: SystemFacultyComponent;
  let fixture: ComponentFixture<SystemFacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemFacultyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
