import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordTimeComponent } from './record-time.component';

describe('RecordTimeComponent', () => {
  let component: RecordTimeComponent;
  let fixture: ComponentFixture<RecordTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordTimeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecordTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

 