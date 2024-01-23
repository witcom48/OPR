import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseperiodComponent } from './closeperiod.component';

describe('CloseperiodComponent', () => {
  let component: CloseperiodComponent;
  let fixture: ComponentFixture<CloseperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseperiodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
