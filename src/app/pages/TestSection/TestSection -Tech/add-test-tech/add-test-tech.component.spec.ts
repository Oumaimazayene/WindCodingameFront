import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTestTechComponent } from './add-test-tech.component';

describe('AddTestTechComponent', () => {
  let component: AddTestTechComponent;
  let fixture: ComponentFixture<AddTestTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTestTechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTestTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
