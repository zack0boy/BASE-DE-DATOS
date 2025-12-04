import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAdminList } from './log-admin-list';

describe('LogAdminList', () => {
  let component: LogAdminList;
  let fixture: ComponentFixture<LogAdminList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogAdminList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAdminList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
