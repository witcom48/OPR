import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetallpolicyComponent } from './setallpolicy.component';

describe('SetallpolicyComponent', () => {
  let component: SetallpolicyComponent;
  let fixture: ComponentFixture<SetallpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetallpolicyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetallpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
