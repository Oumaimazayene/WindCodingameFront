import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTechPriveComponent } from './question-tech-prive.component';

describe('QuestionTechPriveComponent', () => {
  let component: QuestionTechPriveComponent;
  let fixture: ComponentFixture<QuestionTechPriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTechPriveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionTechPriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
