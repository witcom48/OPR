import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfConsentComponent } from './self-consent.component';

describe('SelfConsentComponent', () => {
  let component: SelfConsentComponent;
  let fixture: ComponentFixture<SelfConsentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfConsentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfConsentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
