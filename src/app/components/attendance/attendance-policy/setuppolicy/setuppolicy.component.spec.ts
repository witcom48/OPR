import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetuppolicyComponent } from './setuppolicy.component';

describe('SetuppolicyComponent', () => {
  let component: SetuppolicyComponent;
  let fixture: ComponentFixture<SetuppolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetuppolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetuppolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
