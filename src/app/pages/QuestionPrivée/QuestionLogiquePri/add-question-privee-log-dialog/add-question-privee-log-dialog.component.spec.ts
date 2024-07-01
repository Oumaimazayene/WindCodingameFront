import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionPriveeLogDialogComponent } from './add-question-privee-log-dialog.component';

describe('AddQuestionPriveeLogDialogComponent', () => {
  let component: AddQuestionPriveeLogDialogComponent;
  let fixture: ComponentFixture<AddQuestionPriveeLogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionPriveeLogDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionPriveeLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
