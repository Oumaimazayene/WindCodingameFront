import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutConfirmationDialogComponent } from './ajout-confirmation-dialog.component';

describe('AjoutConfirmationDialogComponent', () => {
  let component: AjoutConfirmationDialogComponent;
  let fixture: ComponentFixture<AjoutConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutConfirmationDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
