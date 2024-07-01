import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuestionLogDialogComponent } from './view-question-log-dialog.component';

describe('ViewQuestionLogDialogComponent', () => {
  let component: ViewQuestionLogDialogComponent;
  let fixture: ComponentFixture<ViewQuestionLogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuestionLogDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuestionLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
