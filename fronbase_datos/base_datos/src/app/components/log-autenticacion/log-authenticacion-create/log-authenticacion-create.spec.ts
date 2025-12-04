import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAuthenticacionCreate } from './log-authenticacion-create';

describe('LogAuthenticacionCreate', () => {
  let component: LogAuthenticacionCreate;
  let fixture: ComponentFixture<LogAuthenticacionCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogAuthenticacionCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAuthenticacionCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
