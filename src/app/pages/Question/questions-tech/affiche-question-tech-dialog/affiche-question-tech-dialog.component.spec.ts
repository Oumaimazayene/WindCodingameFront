import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheQuestionTechDialogComponent } from './affiche-question-tech-dialog.component';

describe('AfficheQuestionTechDialogComponent', () => {
  let component: AfficheQuestionTechDialogComponent;
  let fixture: ComponentFixture<AfficheQuestionTechDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficheQuestionTechDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficheQuestionTechDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
