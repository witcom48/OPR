import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfManageComponent } from './pf-manage.component';

describe('PfManageComponent', () => {
  let component: PfManageComponent;
  let fixture: ComponentFixture<PfManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PfManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
