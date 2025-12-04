import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAutenticacionEdit } from './log-autenticacion-edit';

describe('LogAutenticacionEdit', () => {
  let component: LogAutenticacionEdit;
  let fixture: ComponentFixture<LogAutenticacionEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogAutenticacionEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAutenticacionEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
