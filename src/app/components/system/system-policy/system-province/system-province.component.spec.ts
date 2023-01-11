import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemProvinceComponent } from './system-province.component';

describe('SystemProvinceComponent', () => {
  let component: SystemProvinceComponent;
  let fixture: ComponentFixture<SystemProvinceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemProvinceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemProvinceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
