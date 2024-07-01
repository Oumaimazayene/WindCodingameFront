import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSectionTechComponent } from './test-section-tech.component';

describe('TestSectionTechComponent', () => {
  let component: TestSectionTechComponent;
  let fixture: ComponentFixture<TestSectionTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSectionTechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSectionTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
