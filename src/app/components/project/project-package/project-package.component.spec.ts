import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPackageComponent } from './project-package.component';

describe('ProjectPackageComponent', () => {
  let component: ProjectPackageComponent;
  let fixture: ComponentFixture<ProjectPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
