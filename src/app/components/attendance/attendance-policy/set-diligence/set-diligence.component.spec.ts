import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDiligenceComponent } from './set-diligence.component';

describe('SetDiligenceComponent', () => {
  let component: SetDiligenceComponent;
  let fixture: ComponentFixture<SetDiligenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetDiligenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetDiligenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
