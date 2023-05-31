import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfCheckinComponent } from './self-checkin.component';

describe('SelfCheckinComponent', () => {
  let component: SelfCheckinComponent;
  let fixture: ComponentFixture<SelfCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfCheckinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
