import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCardTypeComponent } from './system-card-type.component';

describe('SystemCardTypeComponent', () => {
  let component: SystemCardTypeComponent;
  let fixture: ComponentFixture<SystemCardTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemCardTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemCardTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
