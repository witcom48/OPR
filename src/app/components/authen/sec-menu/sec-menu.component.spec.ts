import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecMenuComponent } from './sec-menu.component';

describe('SecMenuComponent', () => {
  let component: SecMenuComponent;
  let fixture: ComponentFixture<SecMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
