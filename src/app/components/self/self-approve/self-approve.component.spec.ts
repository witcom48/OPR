import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfApproveComponent } from './self-approve.component';

describe('SelfApproveComponent', () => {
  let component: SelfApproveComponent;
  let fixture: ComponentFixture<SelfApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
