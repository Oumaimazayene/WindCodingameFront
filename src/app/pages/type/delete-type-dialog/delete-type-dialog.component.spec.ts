import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTypeDialogComponent } from './delete-type-dialog.component';

describe('DeleteTypeDialogComponent', () => {
  let component: DeleteTypeDialogComponent;
  let fixture: ComponentFixture<DeleteTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTypeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
