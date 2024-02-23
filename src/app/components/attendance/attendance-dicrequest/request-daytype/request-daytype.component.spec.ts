import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDaytypeComponent } from './request-daytype.component';

describe('RequestDaytypeComponent', () => {
  let component: RequestDaytypeComponent;
  let fixture: ComponentFixture<RequestDaytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDaytypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDaytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
