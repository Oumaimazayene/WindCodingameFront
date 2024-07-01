import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionTechDialogComponent } from './add-question-tech-dialog.component';

describe('AddQuestionTechDialogComponent', () => {
  let component: AddQuestionTechDialogComponent;
  let fixture: ComponentFixture<AddQuestionTechDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuestionTechDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuestionTechDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
