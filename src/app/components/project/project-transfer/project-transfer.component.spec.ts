import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTransferComponent } from './project-transfer.component';

describe('ProjectTransferComponent', () => {
  let component: ProjectTransferComponent;
  let fixture: ComponentFixture<ProjectTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
