import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRounComponent } from './add-roun.component';

describe('AddRounComponent', () => {
  let component: AddRounComponent;
  let fixture: ComponentFixture<AddRounComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRounComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRounComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
