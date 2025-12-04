import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasEdit } from './aulas-edit';

describe('AulasEdit', () => {
  let component: AulasEdit;
  let fixture: ComponentFixture<AulasEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AulasEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AulasEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
