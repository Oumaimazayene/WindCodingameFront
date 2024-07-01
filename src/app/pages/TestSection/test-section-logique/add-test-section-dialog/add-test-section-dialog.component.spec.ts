import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestSectionDialogComponent } from './add-test-section-dialog.component';

describe('AddTestSectionDialogComponent', () => {
  let component: AddTestSectionDialogComponent;
  let fixture: ComponentFixture<AddTestSectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestSectionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
