import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemReligionComponent } from './system-religion.component';

describe('SystemReligionComponent', () => {
  let component: SystemReligionComponent;
  let fixture: ComponentFixture<SystemReligionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemReligionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemReligionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
