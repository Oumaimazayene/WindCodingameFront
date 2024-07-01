import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsLogComponent } from './questions-log.component';

describe('QuestionsLogComponent', () => {
  let component: QuestionsLogComponent;
  let fixture: ComponentFixture<QuestionsLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
