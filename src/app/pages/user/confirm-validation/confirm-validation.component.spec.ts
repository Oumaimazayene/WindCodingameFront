import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmValidationComponent } from './confirm-validation.component';

describe('ConfirmValidationComponent', () => {
  let component: ConfirmValidationComponent;
  let fixture: ComponentFixture<ConfirmValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
