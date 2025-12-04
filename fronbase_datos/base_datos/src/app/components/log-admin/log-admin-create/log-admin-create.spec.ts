import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAdminCreate } from './log-admin-create';

describe('LogAdminCreate', () => {
  let component: LogAdminCreate;
  let fixture: ComponentFixture<LogAdminCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogAdminCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAdminCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
