import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfLineapproveComponent } from './self-lineapprove.component';

describe('SelfLineapproveComponent', () => {
  let component: SelfLineapproveComponent;
  let fixture: ComponentFixture<SelfLineapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfLineapproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfLineapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
