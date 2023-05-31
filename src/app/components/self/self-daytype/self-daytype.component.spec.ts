import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfDaytypeComponent } from './self-daytype.component';

describe('SelfDaytypeComponent', () => {
  let component: SelfDaytypeComponent;
  let fixture: ComponentFixture<SelfDaytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfDaytypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfDaytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
