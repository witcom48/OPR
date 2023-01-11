import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemOrganizationLevelComponent } from './system-organization-level.component';

describe('SystemOrganizationLevelComponent', () => {
  let component: SystemOrganizationLevelComponent;
  let fixture: ComponentFixture<SystemOrganizationLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemOrganizationLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemOrganizationLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
