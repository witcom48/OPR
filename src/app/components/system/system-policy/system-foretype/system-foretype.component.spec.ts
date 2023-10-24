import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemForetypeComponent } from './system-foretype.component';

describe('SystemForetypeComponent', () => {
  let component: SystemForetypeComponent;
  let fixture: ComponentFixture<SystemForetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemForetypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemForetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
