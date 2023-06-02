import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfTopicComponent } from './self-topic.component';

describe('SelfTopicComponent', () => {
  let component: SelfTopicComponent;
  let fixture: ComponentFixture<SelfTopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfTopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelfTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
