import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConfirmationDialogComponent } from './update-confirmation-dialog.component';

describe('UpdateConfirmationDialogComponent', () => {
  let component: UpdateConfirmationDialogComponent;
  let fixture: ComponentFixture<UpdateConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
