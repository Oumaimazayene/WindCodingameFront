import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteQuestionTechDialogComponent } from './delete-question-tech-dialog.component';

describe('DeleteQuestionTechDialogComponent', () => {
  let component: DeleteQuestionTechDialogComponent;
  let fixture: ComponentFixture<DeleteQuestionTechDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuestionTechDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteQuestionTechDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
