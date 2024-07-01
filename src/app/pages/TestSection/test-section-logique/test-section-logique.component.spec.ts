import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSectionLogiqueComponent } from './test-section-logique.component';

describe('TestSectionLogiqueComponent', () => {
  let component: TestSectionLogiqueComponent;
  let fixture: ComponentFixture<TestSectionLogiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSectionLogiqueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestSectionLogiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
