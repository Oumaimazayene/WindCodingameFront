import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsTechComponent } from './questions-tech.component';

describe('QuestionsTechComponent', () => {
  let component: QuestionsTechComponent;
  let fixture: ComponentFixture<QuestionsTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionsTechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionsTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
