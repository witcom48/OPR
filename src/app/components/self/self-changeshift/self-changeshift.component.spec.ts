import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfChangeshiftComponent } from './self-changeshift.component';

describe('SelfChangeshiftComponent', () => {
  let component: SelfChangeshiftComponent;
  let fixture: ComponentFixture<SelfChangeshiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfChangeshiftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfChangeshiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
