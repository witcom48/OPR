import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecAccountComponent } from './sec-account.component';

describe('SecAccountComponent', () => {
  let component: SecAccountComponent;
  let fixture: ComponentFixture<SecAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
