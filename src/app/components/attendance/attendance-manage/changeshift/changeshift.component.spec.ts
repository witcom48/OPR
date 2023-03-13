import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeshiftComponent } from './changeshift.component';

describe('ChangeshiftComponent', () => {
  let component: ChangeshiftComponent;
  let fixture: ComponentFixture<ChangeshiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeshiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeshiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
