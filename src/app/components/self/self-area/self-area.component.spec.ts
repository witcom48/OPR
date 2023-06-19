import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAreaComponent } from './self-area.component';

describe('SelfAreaComponent', () => {
  let component: SelfAreaComponent;
  let fixture: ComponentFixture<SelfAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
