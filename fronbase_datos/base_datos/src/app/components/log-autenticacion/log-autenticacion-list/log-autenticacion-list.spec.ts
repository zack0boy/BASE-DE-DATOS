import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAutenticacionList } from './log-autenticacion-list';

describe('LogAutenticacionList', () => {
  let component: LogAutenticacionList;
  let fixture: ComponentFixture<LogAutenticacionList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogAutenticacionList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAutenticacionList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
