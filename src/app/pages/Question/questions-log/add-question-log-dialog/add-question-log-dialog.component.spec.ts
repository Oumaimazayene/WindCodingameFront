import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionLogDialogComponent } from './add-question-log-dialog.component';

describe('AddQuestionLogDialogComponent', () => {
  let component: AddQuestionLogDialogComponent;
  let fixture: ComponentFixture<AddQuestionLogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionLogDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
