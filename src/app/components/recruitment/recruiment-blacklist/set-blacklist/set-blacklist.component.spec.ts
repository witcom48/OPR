import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetBlacklistComponent } from './set-blacklist.component';

describe('SetBlacklistComponent', () => {
  let component: SetBlacklistComponent;
  let fixture: ComponentFixture<SetBlacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetBlacklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
