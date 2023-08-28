import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPlanComponent } from './items-plan.component';

describe('ItemsPlanComponent', () => {
  let component: ItemsPlanComponent;
  let fixture: ComponentFixture<ItemsPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemsPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
