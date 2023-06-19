import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfReqdocComponent } from './self-reqdoc.component';

describe('SelfReqdocComponent', () => {
  let component: SelfReqdocComponent;
  let fixture: ComponentFixture<SelfReqdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfReqdocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfReqdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
