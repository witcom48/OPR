import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMajorComponent } from './system-major.component';

describe('SystemMajorComponent', () => {
  let component: SystemMajorComponent;
  let fixture: ComponentFixture<SystemMajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemMajorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemMajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
