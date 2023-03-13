import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiligenceComponent } from './diligence.component';

describe('DiligenceComponent', () => {
  let component: DiligenceComponent;
  let fixture: ComponentFixture<DiligenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiligenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiligenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
