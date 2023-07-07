import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfEmpConsentComponent } from './self-emp-consent.component';

describe('SelfEmpConsentComponent', () => {
  let component: SelfEmpConsentComponent;
  let fixture: ComponentFixture<SelfEmpConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfEmpConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfEmpConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
