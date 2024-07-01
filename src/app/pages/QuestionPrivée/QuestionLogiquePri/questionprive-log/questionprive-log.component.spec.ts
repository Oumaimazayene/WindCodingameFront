import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpriveLogComponent } from './questionprive-log.component';

describe('QuestionpriveLogComponent', () => {
  let component: QuestionpriveLogComponent;
  let fixture: ComponentFixture<QuestionpriveLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionpriveLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionpriveLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
