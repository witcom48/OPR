import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAddressTypeComponent } from './system-address-type.component';

describe('SystemAddressTypeComponent', () => {
  let component: SystemAddressTypeComponent;
  let fixture: ComponentFixture<SystemAddressTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemAddressTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemAddressTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
