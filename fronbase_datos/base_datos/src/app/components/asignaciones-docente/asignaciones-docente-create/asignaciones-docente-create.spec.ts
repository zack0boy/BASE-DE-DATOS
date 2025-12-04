import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignacionesDocenteCreate } from './asignaciones-docente-create';

describe('AsignacionesDocenteCreate', () => {
  let component: AsignacionesDocenteCreate;
  let fixture: ComponentFixture<AsignacionesDocenteCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsignacionesDocenteCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignacionesDocenteCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
