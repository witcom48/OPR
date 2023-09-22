import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForetypeComponent } from './foretype.component';

describe('ForetypeComponent', () => {
  let component: ForetypeComponent;
  let fixture: ComponentFixture<ForetypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForetypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForetypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
