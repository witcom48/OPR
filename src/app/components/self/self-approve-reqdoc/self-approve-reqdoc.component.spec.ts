import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfApproveReqdocComponent } from './self-approve-reqdoc.component';

describe('SelfApproveReqdocComponent', () => {
  let component: SelfApproveReqdocComponent;
  let fixture: ComponentFixture<SelfApproveReqdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfApproveReqdocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfApproveReqdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
