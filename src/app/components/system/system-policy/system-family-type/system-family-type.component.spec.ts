import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemFamilyTypeComponent } from './system-family-type.component';

describe('SystemFamilyTypeComponent', () => {
  let component: SystemFamilyTypeComponent;
  let fixture: ComponentFixture<SystemFamilyTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemFamilyTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemFamilyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
