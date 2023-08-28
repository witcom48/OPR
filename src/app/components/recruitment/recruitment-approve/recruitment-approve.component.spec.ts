import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentApproveComponent } from './recruitment-approve.component';

describe('RecruitmentApproveComponent', () => {
  let component: RecruitmentApproveComponent;
  let fixture: ComponentFixture<RecruitmentApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitmentApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitmentApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
