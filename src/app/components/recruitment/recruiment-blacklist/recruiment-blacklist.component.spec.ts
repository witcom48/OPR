import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruimentBlacklistComponent } from './recruiment-blacklist.component';

describe('RecruimentBlacklistComponent', () => {
  let component: RecruimentBlacklistComponent;
  let fixture: ComponentFixture<RecruimentBlacklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruimentBlacklistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruimentBlacklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
