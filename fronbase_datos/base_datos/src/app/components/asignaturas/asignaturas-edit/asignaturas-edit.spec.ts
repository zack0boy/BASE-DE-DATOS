import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturasEdit } from './asignaturas-edit';

describe('AsignaturasEdit', () => {
  let component: AsignaturasEdit;
  let fixture: ComponentFixture<AsignaturasEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignaturasEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignaturasEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
