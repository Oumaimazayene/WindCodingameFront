import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestSectionTechDialogComponent } from './add-test-section-tech-dialog.component';

describe('AddTestSectionTechDialogComponent', () => {
  let component: AddTestSectionTechDialogComponent;
  let fixture: ComponentFixture<AddTestSectionTechDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestSectionTechDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestSectionTechDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
