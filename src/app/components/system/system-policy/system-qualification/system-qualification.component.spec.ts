import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemQualificationComponent } from './system-qualification.component';

describe('SystemQualificationComponent', () => {
  let component: SystemQualificationComponent;
  let fixture: ComponentFixture<SystemQualificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemQualificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemQualificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
