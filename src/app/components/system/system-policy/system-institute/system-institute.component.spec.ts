import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemInstituteComponent } from './system-institute.component';

describe('SystemInstituteComponent', () => {
  let component: SystemInstituteComponent;
  let fixture: ComponentFixture<SystemInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
