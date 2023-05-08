import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SysComlocationComponent } from './sys-comlocation.component';

describe('SysComlocationComponent', () => {
  let component: SysComlocationComponent;
  let fixture: ComponentFixture<SysComlocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SysComlocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SysComlocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
