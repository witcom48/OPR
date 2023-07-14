import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolapproveComponent } from './polapprove.component';

describe('PolapproveComponent', () => {
  let component: PolapproveComponent;
  let fixture: ComponentFixture<PolapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolapproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
