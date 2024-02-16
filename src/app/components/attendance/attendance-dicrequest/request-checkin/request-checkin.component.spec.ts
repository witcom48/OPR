import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestCheckinComponent } from './request-checkin.component';

describe('RequestCheckinComponent', () => {
  let component: RequestCheckinComponent;
  let fixture: ComponentFixture<RequestCheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestCheckinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
