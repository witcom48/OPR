import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfApproveDaytypeComponent } from './self-approve-daytype.component';

describe('SelfApproveDaytypeComponent', () => {
  let component: SelfApproveDaytypeComponent;
  let fixture: ComponentFixture<SelfApproveDaytypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfApproveDaytypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfApproveDaytypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
