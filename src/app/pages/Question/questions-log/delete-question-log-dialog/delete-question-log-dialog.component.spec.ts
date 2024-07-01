import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionLogDialogComponent } from './delete-question-log-dialog.component';

describe('DeleteQuestionLogDialogComponent', () => {
  let component: DeleteQuestionLogDialogComponent;
  let fixture: ComponentFixture<DeleteQuestionLogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuestionLogDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQuestionLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
