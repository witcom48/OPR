import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearperiodComponent } from './yearperiod.component';

describe('YearperiodComponent', () => {
  let component: YearperiodComponent;
  let fixture: ComponentFixture<YearperiodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearperiodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
