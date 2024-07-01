import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestLogiqueComponent } from './add-test-logique.component';

describe('AddTestLogiqueComponent', () => {
  let component: AddTestLogiqueComponent;
  let fixture: ComponentFixture<AddTestLogiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestLogiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestLogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
