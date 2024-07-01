import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestSectionTechDialogComponent } from './view-test-section-tech-dialog.component';

describe('ViewTestSectionTechDialogComponent', () => {
  let component: ViewTestSectionTechDialogComponent;
  let fixture: ComponentFixture<ViewTestSectionTechDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTestSectionTechDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTestSectionTechDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
