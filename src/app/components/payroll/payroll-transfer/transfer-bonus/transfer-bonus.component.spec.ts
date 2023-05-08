import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferBonusComponent } from './transfer-bonus.component';

describe('TransferBonusComponent', () => {
  let component: TransferBonusComponent;
  let fixture: ComponentFixture<TransferBonusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferBonusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferBonusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
