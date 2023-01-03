import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectApproveComponent } from './project-approve.component';

describe('ProjectApproveComponent', () => {
  let component: ProjectApproveComponent;
  let fixture: ComponentFixture<ProjectApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
