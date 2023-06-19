import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSupplyComponent } from './system-supply.component';

describe('SystemSupplyComponent', () => {
  let component: SystemSupplyComponent;
  let fixture: ComponentFixture<SystemSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSupplyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
