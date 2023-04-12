import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfWorkflowComponent } from './self-workflow.component';

describe('SelfWorkflowComponent', () => {
  let component: SelfWorkflowComponent;
  let fixture: ComponentFixture<SelfWorkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfWorkflowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfWorkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
