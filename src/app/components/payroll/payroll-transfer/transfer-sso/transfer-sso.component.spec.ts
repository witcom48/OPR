import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferSsoComponent } from './transfer-sso.component';

describe('TransferSsoComponent', () => {
  let component: TransferSsoComponent;
  let fixture: ComponentFixture<TransferSsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferSsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferSsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
