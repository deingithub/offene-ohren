import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterHelperComponent } from './register-helper.component';

describe('RegisterHelperComponent', () => {
  let component: RegisterHelperComponent;
  let fixture: ComponentFixture<RegisterHelperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterHelperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
