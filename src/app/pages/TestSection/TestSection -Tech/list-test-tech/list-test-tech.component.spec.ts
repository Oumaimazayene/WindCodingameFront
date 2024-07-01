import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTestTechComponent } from './list-test-tech.component';

describe('ListTestTechComponent', () => {
  let component: ListTestTechComponent;
  let fixture: ComponentFixture<ListTestTechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTestTechComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTestTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
