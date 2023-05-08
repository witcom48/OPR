import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComlocationlistComponent } from './comlocationlist.component';

describe('ComlocationlistComponent', () => {
  let component: ComlocationlistComponent;
  let fixture: ComponentFixture<ComlocationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComlocationlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComlocationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
