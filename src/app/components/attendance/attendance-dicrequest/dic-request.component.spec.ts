import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicRequestComponent } from './dic-request.component';

describe('DicRequestComponent', () => {
  let component: DicRequestComponent;
  let fixture: ComponentFixture<DicRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DicRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
