import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddquestionTechPriveComponent } from './addquestion-tech-prive.component';

describe('AddquestionTechPriveComponent', () => {
  let component: AddquestionTechPriveComponent;
  let fixture: ComponentFixture<AddquestionTechPriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddquestionTechPriveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddquestionTechPriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
