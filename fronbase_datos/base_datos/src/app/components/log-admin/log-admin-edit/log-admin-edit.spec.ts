import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAdminEdit } from './log-admin-edit';

describe('LogAdminEdit', () => {
  let component: LogAdminEdit;
  let fixture: ComponentFixture<LogAdminEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogAdminEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAdminEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
