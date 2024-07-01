import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRespenseComponent } from './register-respense.component';

describe('RegisterRespenseComponent', () => {
  let component: RegisterRespenseComponent;
  let fixture: ComponentFixture<RegisterRespenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterRespenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterRespenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
