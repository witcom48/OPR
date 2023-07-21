import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeftAccountManageComponent } from './seft-account-manage.component';

describe('SeftAccountManageComponent', () => {
  let component: SeftAccountManageComponent;
  let fixture: ComponentFixture<SeftAccountManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeftAccountManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeftAccountManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
