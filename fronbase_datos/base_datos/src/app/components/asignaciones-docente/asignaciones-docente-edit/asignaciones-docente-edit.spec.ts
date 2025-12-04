import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesDocenteEdit } from './asignaciones-docente-edit';

describe('AsignacionesDocenteEdit', () => {
  let component: AsignacionesDocenteEdit;
  let fixture: ComponentFixture<AsignacionesDocenteEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionesDocenteEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionesDocenteEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
