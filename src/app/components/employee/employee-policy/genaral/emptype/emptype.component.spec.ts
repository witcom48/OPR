import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptypeComponent } from './emptype.component';

describe('EmptypeComponent', () => {
  let component: EmptypeComponent;
  let fixture: ComponentFixture<EmptypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
