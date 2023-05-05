import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferTaxComponent } from './transfer-tax.component';

describe('TransferTaxComponent', () => {
  let component: TransferTaxComponent;
  let fixture: ComponentFixture<TransferTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferTaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
