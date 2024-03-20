import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectWithdrawComponent } from './project-withdraw.component';

describe('ProjectWithdrawComponent', () => {
  let component: ProjectWithdrawComponent;
  let fixture: ComponentFixture<ProjectWithdrawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectWithdrawComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
