import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfChangepasswordComponent } from './self-changepassword.component';

describe('SelfChangepasswordComponent', () => {
  let component: SelfChangepasswordComponent;
  let fixture: ComponentFixture<SelfChangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfChangepasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
