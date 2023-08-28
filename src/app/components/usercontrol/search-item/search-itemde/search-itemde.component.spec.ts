import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchItemdeComponent } from './search-itemde.component';

describe('SearchItemdeComponent', () => {
  let component: SearchItemdeComponent;
  let fixture: ComponentFixture<SearchItemdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchItemdeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchItemdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
