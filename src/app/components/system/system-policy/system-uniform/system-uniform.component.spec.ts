import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemUniformComponent } from './system-uniform.component';

describe('SystemUniformComponent', () => {
  let component: SystemUniformComponent;
  let fixture: ComponentFixture<SystemUniformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemUniformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemUniformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
